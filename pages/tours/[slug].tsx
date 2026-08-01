import React from 'react';
import { useRouter } from 'next/router';
import TourDetails from '../../components/TourDetails';
import TourBooking from '../../components/TourBooking';
import { tours } from '../../data/staticData';
import { TourPackage } from '../../types/staticData';
import styles from '../../styles/TourPackage.module.scss';
import SEO from '../../components/SEO';

const TourPackageDetails: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Function to convert title to slug for comparison
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Find the tour that matches the slug
  const tour = tours.find((tour) => createSlug(tour.title) === slug);

  // If no matching tour is found or slug is not yet available (SSR first render)
  if (!tour && slug) {
    return (
      <div className="container" style={{ padding: '24px 20px 60px', textAlign: 'center' }}>
        <SEO 
          title="Tour Not Found" 
          description="The tour package you're looking for was not found. Browse our other available tour packages."
          noIndex={true}
        />
        <h1>Tour Not Found</h1>
        <p>The tour you're looking for does not exist.</p>
        <button 
          onClick={() => router.push('/')}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Go Back to Tours
        </button>
      </div>
    );
  }

  // If slug is not yet available (during SSR)
  if (!slug || !tour) {
    return <div>Loading...</div>;
  }

  // Create structured data for the tour
  const tourStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tour.title,
    description: tour.description,
    image: tour.mainImage || tour.images[0],
    sku: `TOUR-${tour.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Happy Trails Tourism'
    },
    offers: {
      '@type': 'Offer',
      url: `https://happytrailstourism.com/tours/${slug}`,
      priceCurrency: 'INR',
      price: tour.discountedPrice,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating || 4.8,
      reviewCount: tour.reviews || 125,
      bestRating: 5,
      worstRating: 1
    }
  };
  
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
        name: tour.title,
        item: `https://happytrailstourism.com/tours/${slug}`
      }
    ]
  };
  
  // Create FAQ structured data from tour highlights
  const faqItems = tour.highlights ? tour.highlights.slice(0, 5).map((highlight, index) => ({
    '@type': 'Question',
    name: `What's special about this ${tour.locations[0].place} tour?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: highlight
    }
  })) : [];
  
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems
  };

  return (
    <>
      <SEO
        title={`${tour.title} - ${tour.duration} | Happy Trails Tourism`}
        description={`Book the ${tour.title} package with Happy Trails Tourism. Enjoy ${tour.locations.map(l => l.place).join(', ')} with our ${tour.duration} tour package. Save ₹${tour.savings} with our special offers!`}
        keywords={`${tour.locations.map(l => l.place).join(', ')} tour package, ${tour.duration} tour, ${tour.title}, travel package, holiday package, vacation package, best ${tour.locations[0].place} tour`}
        ogType="product"
        ogImage={typeof tour.mainImage === 'string' ? tour.mainImage : (typeof tour.images[0] === 'string' ? tour.images[0] : '/images/default-tour.jpg')}
        ogImageAlt={`${tour.title} - Tour Package by Happy Trails Tourism`}
        structuredData={[tourStructuredData, breadcrumbStructuredData, faqStructuredData]}
      />
      <main className="container" style={{ padding: '24px 20px 60px' }}>
        <div className={styles.pageNavigation}>
          <div className={styles.breadcrumb}>
            <span onClick={() => router.push('/')}>Tours</span> &gt; <span>Package Details</span>
          </div>
        </div>
        
        {tour.mainImage && tour.thumbnails && (
          <TourDetails 
            mainImage={tour.mainImage}
            thumbnails={tour.thumbnails}
          />
        )}
        
        <TourBooking 
          title={tour.title}
          rating={tour.rating}
          reviews={tour.reviews}
          originalPrice={tour.originalPrice}
          discountedPrice={tour.discountedPrice}
          savings={tour.savings}
          duration={tour.duration}
          packageOptions={tour.packageOptions || []}
          highlights={tour.highlights || []}
          itinerary={tour.itinerary || []}
          bannerImages={tour.bannerImages || []}
          activities={tour.activities || []}
          summary={tour.summary}
          flights={tour.flights || []}
          stay={tour.stay || []}
          transfers={tour.transfers || []}
          location={tour.locations[0].place}
          inclusions={tour.inclusions || []}
          exclusions={tour.exclusions || []}
        />
      </main>
    </>
  );
};

export default TourPackageDetails; 