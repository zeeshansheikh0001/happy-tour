import React, { useEffect, useRef, useState } from 'react';
import TourCard from '../TourCard';
import TourismBoardAlliances from '../TourismBoardAlliances';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Tours.module.scss';

// Mock data for tours
const tours = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583997052301-0042b33fc598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1550077770-0962b9a962db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582672008243-2569804aec3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Escape To Dubai | Flights Inclusive Deal',
    duration: '5 days & 4 nights',
    rating: 5.0,
    reviews: 1200,
    originalPrice: 124761,
    discountedPrice: 68550,
    savings: 56211,
    locations: [
      { days: 5, place: 'Dubai' }
    ]
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580139906626-472142ceab5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555912881-1ecd82307e0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat',
    duration: '7 days & 6 nights',
    rating: 5.0,
    reviews: 512,
    originalPrice: 84616,
    discountedPrice: 55000,
    savings: 29616,
    locations: [
      { days: 3, place: 'Singapore' },
      { days: 4, place: 'Kuta' }
    ]
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583997052301-0042b33fc598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591330765675-b32c576919a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582960738065-7e17d6dc5e99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1549385117-af8a32212abb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Dubai Kids Special With FREE Tickets To Aquaventure Waterpark',
    duration: '6 days & 5 nights',
    rating: 4.8,
    reviews: 425,
    originalPrice: 91437,
    discountedPrice: 68750,
    savings: 22687,
    locations: [
      { days: 6, place: 'Dubai' }
    ]
  },
  {
    id: 4,
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1552890869-56c9161b2062?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1490077476659-095159692ab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Bangkok Phuket Krabi | FREE 4 Island Tour In Krabi',
    duration: '8 days & 7 nights',
    rating: 4.8,
    reviews: 2100,
    originalPrice: 80061,
    discountedPrice: 43990,
    savings: 36071,
    locations: [
      { days: 2, place: 'Bangkok' },
      { days: 3, place: 'Phuket' },
      { days: 3, place: 'Krabi' }
    ]
  },
  {
    id: 5,
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582672008243-2569804aec3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    ],
      
    title: 'Wonders of Thailand | Culture, Corals and Coastlines',
    duration: '8 days & 7 nights',
    rating: 4.7,
    reviews: 1800,
    originalPrice: 60200,
    discountedPrice: 49500,
    savings: 10700,
    locations: [
      { days: 2, place: 'Pattaya' },
      { days: 2, place: 'Bangkok' },
      { days: 4, place: 'Phuket' }
    ]
  },
  {
    id: 6,
    images: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1536698258381-68078f782b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566289753622-8342efbc2242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527840369269-b5ce8da9a4af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Phuket Krabi | A Flights Inclusive DEAL',
    duration: '6 days & 5 nights',
    rating: 5.0,
    reviews: 1100,
    originalPrice: 108383,
    discountedPrice: 64900,
    savings: 43483,
    locations: [
      { days: 2, place: 'Krabi' },
      { days: 4, place: 'Phuket' }
    ]
  }
];

// Thailand banner carousel data
const thailandBannerData = {
  images: [
    {
      src: '/images/tourism/oman-tourism-desktop.png',
      alt: 'Oman tourism scene'
    },
    {
      src: '/images/tourism/visit-qatar.png',
      alt: 'Visit Qatar tourism scene'
    },
    {
      src: '/images/tourism/oman-tourism-desktop.png',
      alt: 'Oman tourism scene'
    },
    {
      src: '/images/tourism/visit-qatar.png',
      alt: 'Visit Qatar tourism scene'
    },
    
  ],
 
};

const Tours: React.FC = () => {
  // Create refs for tour cards
  const tourRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Function to navigate the Thailand banner carousel
  const navigateBanner = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentBannerIndex(prev => 
        prev === 0 ? thailandBannerData.images.length - 1 : prev - 1
      );
    } else {
      setCurrentBannerIndex(prev => 
        prev === thailandBannerData.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  useEffect(() => {
    // Set up the intersection observer to detect when tour cards are in view
    const observerOptions = {
      root: null, // use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1 // trigger when at least 10% of the element is visible
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element comes into view
          entry.target.classList.add(styles.animate);
          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all tour card wrapper elements
    tourRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    // Auto-rotate the Thailand banner
    const bannerInterval = setInterval(() => {
      navigateBanner('next');
    }, 5000);
    
    // Clean up the observer and interval on component unmount
    return () => {
      observer.disconnect();
      clearInterval(bannerInterval);
    };
  }, []);
  
  // Store refs for each tour card wrapper
  const setTourRef = (el: HTMLDivElement | null, index: number) => {
    tourRefs.current[index] = el;
  };
  
  // Render tour cards with the Thailand banner after the third tour
  const renderToursWithBanner = () => {
    const tourCards = tours.map((tour, index) => (
      <div 
        key={tour.id} 
        className={styles.tourCardWrapper} 
        ref={(el) => setTourRef(el, index)}
      >
        <TourCard
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
      </div>
    ));
    
    // Insert the Thailand banner after the third tour card
    if (tourCards.length >= 3) {
      tourCards.splice(3, 0, (
        <div key="thailand-banner" className={styles.thailandBannerWrapper}>
          <div className={styles.thailandBanner}>
            <div className={styles.bannerImageContainer}>
              <Image 
                src={thailandBannerData.images[currentBannerIndex].src}
                alt={thailandBannerData.images[currentBannerIndex].alt}
                fill
                priority
                className={styles.bannerImage}
              />  
              <button 
                className={`${styles.bannerNav} ${styles.prevBtn}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateBanner('prev');
                }}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button 
                className={`${styles.bannerNav} ${styles.nextBtn}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateBanner('next');
                }}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
              
              <div className={styles.bannerDots}>
                {thailandBannerData.images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.bannerDot} ${currentBannerIndex === index ? styles.activeDot : ''}`}
                    onClick={() => setCurrentBannerIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ));
    }
    
    return tourCards;
  };
  
  return (
    <div className={styles.toursContainer}>
      <h1 className={styles.title}>Tours In Dubai & Asia</h1>
      <div className={styles.toursGrid}>
        {renderToursWithBanner()}
      </div>
      <TourismBoardAlliances scrollSpeed={40} />
    </div>
  );
};

export default Tours; 