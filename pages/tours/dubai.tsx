import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import TourCard from '../../components/TourCard';
import SEO from '../../components/SEO';
import SectionHeading from '../../components/SectionHeading';
import { focusTours } from '../../data/staticData';
import styles from '../../components/FeaturedHolidays/FeaturedHolidays.module.scss';

const dubaiTours = focusTours.filter((tour) =>
  [tour.title, ...tour.locations.map((location) => location.place)].join(' ').toLowerCase().includes('dubai'),
);

const DubaiToursPage: React.FC = () => {
  const router = useRouter();
  // Create breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://happytrailstourism.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dubai holidays',
        item: 'https://happytrailstourism.com/tours/dubai'
      }
    ]
  };
  
  // Create destination structured data
  const destinationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Dubai',
    description: 'Experience the magic of Dubai with our premium tour packages. Visit iconic landmarks like Burj Khalifa, enjoy desert safaris, and explore the vibrant city life with Happy Trails Tourism.',
    touristType: [
      'Family vacation travelers',
      'Honeymooners',
      'Luxury travelers',
      'Adventure seekers'
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.276987',
      longitude: '55.296249'
    }
  };

  return (
    <>
      <SEO
        title="Dubai Tour Packages | Best Deals & Offers | Happy Trails Tourism"
        description="Book the best Dubai tour packages with Happy Trails Tourism. Discover flight-inclusive deals, family packages with waterpark tickets, and luxury Dubai experiences at unbeatable prices."
        keywords="Dubai tour packages, Dubai holiday packages, Dubai flights inclusive deals, Dubai family packages, luxury Dubai tours, Burj Khalifa tickets, Desert Safari Dubai"
        ogType="website"
        ogImageAlt="Dubai skyline"
        structuredData={[breadcrumbStructuredData, destinationStructuredData]}
      />
      <Header
        activeTab="tours"
        onTabChange={(tab) => {
          if (tab === 'activities') router.push('/activities');
          else if (tab === 'visa') router.push('/?tab=visa');
          else router.push('/');
        }}
        onNavigate={(id) => {
          router.push(id === 'explore' ? '/' : `/?destination=${id}`);
        }}
      />
      <main>
        <section className={styles.section} aria-labelledby="dubai-tours-heading">
          <div className={styles.inner}>
            <SectionHeading
              as="h1"
              eyebrow="Dubai"
              icon="umbrella"
              title="Dubai holidays"
              titleId="dubai-tours-heading"
              description="Flight-inclusive and family packages we currently list for Dubai."
            />
            <div className={styles.grid}>
              {dubaiTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  id={tour.id}
                  images={tour.images}
                  title={tour.title}
                  duration={tour.duration}
                  rating={tour.rating}
                  reviews={tour.reviews}
                  originalPrice={tour.originalPrice}
                  discountedPrice={tour.discountedPrice}
                  savings={tour.savings}
                  locations={tour.locations}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DubaiToursPage; 