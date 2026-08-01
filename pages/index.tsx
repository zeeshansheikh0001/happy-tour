import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Tours from '../components/Tours';
import Activities from '../components/Activities';
import Visa from '../components/Visa';
import styles from './HomePage.module.scss';
import { navigationItems, tours, activities } from '../data/staticData';
import Image from 'next/image';
import SEO from '../components/SEO';
import { useCurrency } from '../context/CurrencyContext';

// A component to display destination-specific content
const DestinationContent = ({ destination }: { destination: string }) => {
  // Filter tours based on the selected destination
  const destinationTours = tours.filter(tour => 
    tour.locations.some(location => 
      location.place.toLowerCase() === destination.toLowerCase()
    )
  );

  // Filter activities based on the selected destination
  const destinationActivities = activities.filter(activity => 
    activity.location.toLowerCase() === destination.toLowerCase()
  );

  // Find the navigation item to get its details
  const navItem = navigationItems.find(item => item.id === destination);

  return (
    <div style={{ padding: '20px' }}>
      <h1 className={styles.destinationTitle}>
        {navItem?.name || destination.charAt(0).toUpperCase() + destination.slice(1)}
      </h1>
      
      {destinationTours.length > 0 && (
        <div className={styles.destinationSection}>
          <h2>Popular Tours</h2>
          <div className={styles.destinationGrid}>
            {destinationTours.map(tour => (
              <div key={tour.id} className={styles.destinationCard}>
                <div className={styles.destinationImageContainer}>
                  <Image 
                    src={tour.images[0]} 
                    alt={tour.title}
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.destinationCardContent}>
                  <h3>{tour.title}</h3>
                  <p>{tour.duration}</p>
                  <div className={styles.priceInfo}>
                    <span className={styles.originalPrice}>₹{tour.originalPrice.toLocaleString()}</span>
                    <span className={styles.discountedPrice}>₹{tour.discountedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {destinationActivities.length > 0 && (
        <div className={styles.destinationSection}>
          <h2>Popular Activities</h2>
          <div className={styles.destinationGrid}>
            {destinationActivities.map(activity => (
              <div key={activity.id} className={styles.destinationCard}>
                <div className={styles.destinationImageContainer}>
                  <Image 
                    src={activity.image} 
                    alt={activity.title}
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.destinationCardContent}>
                  <h3>{activity.title}</h3>
                  <p>{activity.duration}</p>
                  <div className={styles.priceInfo}>
                    <span className={styles.discountedPrice}>₹{activity.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {destinationTours.length === 0 && destinationActivities.length === 0 && (
        <p className={styles.noContentMessage}>
          We're currently expanding our offerings for {navItem?.name || destination}. 
          Check back soon for exciting tours and activities!
        </p>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tours');
  const [activeNavItem, setActiveNavItem] = useState('explore');
  const [showDestination, setShowDestination] = useState(false);
  const { selectedCurrency } = useCurrency();

  // Show destination content when a destination is selected
  useEffect(() => {
    if (activeNavItem !== 'explore' && !showDestination) {
      setShowDestination(true);
    } else if (activeNavItem === 'explore') {
      setShowDestination(false);
    }
  }, [activeNavItem, showDestination]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Scroll to the top of the page when switching tabs
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigate = (id: string) => {
    setActiveNavItem(id);
  };

  // Content visibility control based on active tab and selected destination
  const isExploreMode = activeNavItem === 'explore';

  // Animation variants
  const tabContentVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    visible: { 
      opacity: 1,
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        y: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.3 }
      } 
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  // Featured tour packages for structured data
  const featuredTours = tours.slice(0, 3).map(tour => ({
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
  
  // Create FAQ structured data
  const faqsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What destinations do Happy Trails Tourism offer packages for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Happy Trails Tourism offers travel packages to popular destinations including Dubai, Singapore, Thailand, Bali, and many other locations across Asia. Our packages are customizable based on your preferences.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are flights included in your packages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many of our packages include flights, such as our "Escape To Dubai | Flights Inclusive Deal". When browsing packages, look for "Flights Inclusive" in the title or description to find these all-inclusive options.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I get assistance with planning my trip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can request a callback from our travel experts by clicking the "Request Callback" button on any package page. Our experienced consultants will contact you to discuss your requirements and help customize your perfect vacation.'
        }
      }
    ]
  };

  // Get unique activity locations
  const activityLocations = [...new Set(activities.map(activity => activity.location))];
  
  return (
    <div className={styles.container}>
      <SEO 
        title="Happy Trails Tourism | Explore Dubai, Singapore, Thailand & More"
        description="Book unforgettable travel experiences with Happy Trails Tourism. Discover our best flight-inclusive deals, family packages, and honeymoon specials to Dubai, Singapore, Thailand, and Bali."
        keywords="travel packages, dubai tours, singapore packages, thailand holiday, bali honeymoon, flight inclusive deals, family vacation packages, best tour deals"
        ogImage="/images/happy-trails-og.jpg" 
        ogType="website"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'Happy Trails Tourism',
            url: 'https://happytrailstourism.com',
            logo: 'https://happytrailstourism.com/images/logo.png',
            description: 'Happy Trails Tourism offers personalized travel experiences including tours, holiday packages, adventure trips, and cultural excursions to destinations like Dubai, Singapore, Thailand and Bali.',
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
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        activeNavItem={activeNavItem} 
        onNavigate={handleNavigate}
      />

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {showDestination ? (
            <motion.div
              key="destination"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
            >
              <DestinationContent destination={activeNavItem} />
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
              {activeTab === 'tours' && <Tours />}
              {activeTab === 'activities' && (
                <>
                  <Activities 
                    title="Featured Dubai Activities" 
                    location="Dubai" 
                  />
                  
                  {activityLocations
                    .filter(location => location !== 'Dubai') // Skip Dubai since it's already shown above
                    .map(location => (
                      <Activities 
                        key={location}
                        title={`Let's Explore ${location}`}
                        location={location}
                      />
                    ))
                  }
                </>
              )}
              {activeTab === 'visa' && <Visa />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style jsx>{`
        main {
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .main-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #333;
          text-align: center;
        }
        .currency-info {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #666;
          background-color: #f9f9f9;
          padding: 0.5rem;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
  
export default Home;
