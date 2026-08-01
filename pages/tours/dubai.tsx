import React from 'react';
import Tours from '../../components/Tours';
import SEO from '../../components/SEO';

const DubaiToursPage: React.FC = () => {
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
        name: 'Tours',
        item: 'https://happytrailstourism.com/tours'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Dubai Tours',
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
        ogImage="/images/dubai-tour-packages.jpg"
        ogImageAlt="Luxury Dubai Tour Packages by Happy Trails Tourism"
        structuredData={[breadcrumbStructuredData, destinationStructuredData]}
      />
      <main>
        <Tours />
      </main>
    </>
  );
};

export default DubaiToursPage; 