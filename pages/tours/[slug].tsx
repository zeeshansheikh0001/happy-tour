import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import TourDetails from '../../components/TourDetails';
import TourBooking from '../../components/TourBooking';
import { tours } from '../../data/staticData';
import styles from '../../styles/TourPackage.module.scss';
import SEO from '../../components/SEO';
import { createSlug } from '../../utils/slug';

const TourPackageDetails: React.FC = () => {
  const router = useRouter();
  const slugParam = router.query.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  // Find the tour that matches the slug
  const tour = tours.find((item) => createSlug(item.title) === slug);

  // If no matching tour is found or slug is not yet available (SSR first render)
  if (!tour && slug) {
    return (
      <div className={styles.emptyState}>
        <SEO 
          title="Tour Not Found" 
          description="The tour package you're looking for was not found. Browse our other available tour packages."
          noIndex={true}
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
        <h1>Tour Not Found</h1>
        <p>The tour you're looking for does not exist.</p>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push('/')}
        >
          Browse holidays
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
    name: `What's special about this ${tour.locations[0]?.place || tour.title} tour?`,
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
        keywords={`${tour.locations.map(l => l.place).join(', ')} tour package, ${tour.duration} tour, ${tour.title}, travel package, holiday package, vacation package, best ${tour.locations[0]?.place || 'holiday'} tour`}
        ogType="product"
        ogImage={typeof tour.mainImage === 'string' ? tour.mainImage : (tour.mainImage?.src || tour.images[0] || '/images/default-tour.jpg')}
        ogImageAlt={`${tour.title} - Tour Package by Happy Trails Tourism`}
        structuredData={[tourStructuredData, breadcrumbStructuredData, faqStructuredData]}
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
      <main className={styles.page}>
        <div className={styles.inner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.crumb}>Home</Link>
          <span className={styles.crumbSep} aria-hidden="true">/</span>
          <Link href="/?tab=holidays" className={styles.crumb}>Holidays</Link>
          <span className={styles.crumbSep} aria-hidden="true">/</span>
          <Link
            href={`/?destination=${createSlug(tour.locations[0]?.place || 'dubai')}`}
            className={styles.crumb}
          >
            {tour.locations[0]?.place || 'Destination'}
          </Link>
          <span className={styles.crumbSep} aria-hidden="true">/</span>
          <span className={styles.crumbCurrent}>{tour.title}</span>
        </nav>
        
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
          location={tour.locations[0]?.place || ''}
          inclusions={tour.inclusions || []}
          exclusions={tour.exclusions || []}
        />
        </div>
      </main>
    </>
  );
};

export default TourPackageDetails; 