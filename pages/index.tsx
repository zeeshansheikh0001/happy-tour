import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import SEO from '../components/SEO';
import TouristFeedback from '../components/TouristFeedback';
import TrustSocialProof from '../components/TrustSocialProof';
import FAQ from '../components/FAQ';
import DestinationGrid from '../components/DestinationGrid';
import FeaturedHolidays from '../components/FeaturedHolidays';
import CustomizeSection from '../components/CustomizeSection';
import HowItWorks from '../components/HowItWorks';
import ActivitiesTeaser from '../components/ActivitiesTeaser';
import DestinationGuide from '../components/DestinationGuide';
import VisaTeaser from '../components/VisaTeaser';
import TourCard from '../components/TourCard';
import ActivityCard from '../components/ActivityCard';
import {
  activities,
  destinationFaqs,
  destinationPages,
  faqs,
  focusTours,
  touristFeedback,
} from '../data/staticData';
import styles from './HomePage.module.scss';

const Activities = dynamic(() => import('../components/Activities'));
const Visa = dynamic(() => import('../components/Visa'));
const TourismBoardAlliances = dynamic(() => import('../components/TourismBoardAlliances'));

const DESTINATION_ALIASES: Record<string, string[]> = {
  dubai: ['dubai'],
  vietnam: ['vietnam', 'hanoi', 'da nang', 'danang', 'ho chi minh', 'saigon', 'halong', 'hoi an', 'phu quoc'],
  bali: ['bali', 'kuta'],
  thailand: ['thailand', 'bangkok', 'phuket', 'krabi', 'pattaya'],
  ladakh: ['ladakh'],
  kashmir: ['kashmir'],
  'north-east-india': ['north east', 'northeast'],
};

const matchesDestination = (haystack: string, destination: string) => {
  const aliases = DESTINATION_ALIASES[destination] || [destination.replace(/-/g, ' ')];
  const text = haystack.toLowerCase();
  return aliases.some((alias) => text.includes(alias));
};

const DestinationContent = ({ destination }: { destination: string }) => {
  const page = destinationPages.find((item) => item.id === destination);
  const destinationName = page?.name || destination.replace(/-/g, ' ');
  const destinationTours = focusTours.filter((tour) =>
    matchesDestination(
      [tour.title, ...tour.locations.map((location) => location.place)].join(' '),
      destination,
    ),
  );
  const activityLocation = destination === 'vietnam' ? 'Vietnam' : destinationName;

  return (
    <>
      <DestinationGuide destinationId={destination} />
      <FeaturedHolidays
        tours={destinationTours}
        eyebrow={destinationName}
        heading={page?.heading || `${destinationName} holidays`}
        description={
          page?.description ||
          `Packages we currently list for ${destinationName}. The team confirms dates after you enquire.`
        }
        showViewAll={false}
      />
      <CustomizeSection destinationId={destination} destinationName={destinationName} />
      <ActivitiesTeaser
        location={activityLocation}
        heading={`Things to do in ${destinationName}`}
        description={`Tickets and day experiences you can add to a ${destinationName} stay, or book on their own.`}
        showViewAll={false}
      />
      <HowItWorks destinationName={destinationName} />
      <VisaTeaser destinationId={destination} />
    </>
  );
};

const getSearchParams = (asPath: string) => {
  const query = asPath.includes('?') ? asPath.slice(asPath.indexOf('?') + 1).split('#')[0] : '';
  return new URLSearchParams(query);
};

const Home: React.FC = () => {
  const router = useRouter();
  const params = getSearchParams(router.asPath);
  const destFromUrl = params.get('destination') || '';
  const tabFromUrl = params.get('tab') || '';

  const [activeTab, setActiveTab] = useState('tours');
  const [activeNavItem, setActiveNavItem] = useState('explore');
  const [hasMounted, setHasMounted] = useState(false);
  const resolvedTab = tabFromUrl === 'activities' || tabFromUrl === 'visa' ? tabFromUrl : 'tours';
  const resolvedNav = destFromUrl || activeNavItem;
  const showDestination = hasMounted && Boolean(destFromUrl) && resolvedTab === 'tours';
  const showToursChrome = !hasMounted || resolvedTab === 'tours';
  const showVisaPage = hasMounted && resolvedTab === 'visa';
  const destinationPage = showDestination
    ? destinationPages.find((item) => item.id === destFromUrl)
    : undefined;
  const pageFaqs = useMemo(
    () => (showDestination ? destinationFaqs[destFromUrl] || faqs : faqs),
    [showDestination, destFromUrl],
  );
  const feedbackItems = useMemo(
    () =>
      showDestination
        ? touristFeedback.filter((item) => item.destinationId === destFromUrl)
        : touristFeedback,
    [showDestination, destFromUrl],
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (!hash) return;

    const node = document.getElementById(hash);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [router.asPath]);

  useEffect(() => {
    if (tabFromUrl === 'activities' || tabFromUrl === 'visa') {
      setActiveTab(tabFromUrl);
      setActiveNavItem('explore');
      return;
    }

    setActiveTab('tours');
    setActiveNavItem(destFromUrl || 'explore');
  }, [destFromUrl, tabFromUrl]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'tours') {
      setActiveNavItem('explore');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigate = (id: string) => {
    setActiveNavItem(id);
    if (id !== 'explore') {
      setActiveTab('tours');
    }
  };

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  // Featured tour packages for structured data
  const featuredTours = focusTours.slice(0, 3).map(tour => ({
    '@type': 'Product',
    name: tour.title,
    description: tour.description || `${tour.duration} tour package including ${tour.locations.map(l => l.place).join(', ')}`,
    offers: {
      '@type': 'Offer',
      price: tour.discountedPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock'
    },
    image: tour.images[0],
    sku: `TOUR-${tour.id}`
  }));
  
  const faqsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // Get unique activity locations
  const activityLocations = [...new Set(activities.map(activity => activity.location))];
  
  return (
    <div className={styles.container}>
      <SEO 
        title={destinationPage?.seoTitle || 'Happy Trails Tourism | Dubai, Vietnam & India Holidays'}
        description={destinationPage?.seoDescription || 'Book holidays with Happy Trails Tourism. Flight-inclusive deals and family packages for Dubai, Vietnam, and India — Ladakh, Kashmir, and North East India.'}
        keywords="travel packages, dubai tours, vietnam packages, ladakh holiday, kashmir packages, north east india tours, flight inclusive deals, family vacation packages"
        ogImage="/images/happy-trails-og.jpg" 
        ogType="website"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'Happy Trails Tourism',
            url: 'https://happytrailstourism.com',
            logo: 'https://happytrailstourism.com/images/logo.png',
            description: 'Happy Trails Tourism offers holiday packages, activities, and visa help for Dubai, Vietnam, and India — Ladakh, Kashmir, and North East India.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Tourism Avenue',
              addressLocality: 'Mumbai',
              addressRegion: 'Maharashtra',
              postalCode: '400001',
              addressCountry: 'IN'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '19.0760',
              longitude: '72.8777'
            },
            openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-18:00',
            telephone: '+91-1234567890',
            priceRange: '₹₹₹',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1250'
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Travel Packages',
              itemListElement: featuredTours
            }
          },
          faqsStructuredData
        ]}
      />

      <Header 
        activeTab={resolvedTab} 
        onTabChange={handleTabChange} 
        activeNavItem={resolvedNav} 
        onNavigate={handleNavigate}
      />

      {showToursChrome && (
        <>
          <HeroSlider activeDestination={showDestination ? destFromUrl : ''} />
        </>
      )}

      {!showVisaPage && !showDestination && <TrustSocialProof />}

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {showDestination ? (
            <motion.div
              key={destFromUrl}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
            >
              <DestinationContent destination={destFromUrl} />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className={styles.tabContent}
            >
              {activeTab === 'tours' && (
                <>
                  <DestinationGrid />
                  <FeaturedHolidays />
                  <CustomizeSection />
                  <HowItWorks />
                  <ActivitiesTeaser />
                  <VisaTeaser />
                  <TourismBoardAlliances scrollSpeed={40} />
                </>
              )}
              {activeTab === 'activities' && (
                <>
                  <Activities
                    title="Dubai day trips and tickets"
                    subtitle="Add these to a holiday, or open the full list across all seven emirates."
                    location="Dubai"
                  />

                  {activityLocations
                    .filter((location) => location !== 'Dubai')
                    .map((location) => (
                      <Activities
                        key={location}
                        title={`${location} activities`}
                        subtitle={`Experiences in ${location} you can book on their own.`}
                        location={location}
                      />
                    ))}
                </>
              )}
              {activeTab === 'visa' && <Visa />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {!showVisaPage && feedbackItems.length > 0 && (
        <TouristFeedback items={feedbackItems} />
      )}
      {!showVisaPage && (
        <FAQ
          items={pageFaqs}
          title={destinationPage ? `${destinationPage.name} questions` : undefined}
          description={
            destinationPage
              ? `Season, stay length, visa, and how a ${destinationPage.name} enquiry is confirmed.`
              : undefined
          }
        />
      )}
    </div>
  );
};
  
export default Home;
