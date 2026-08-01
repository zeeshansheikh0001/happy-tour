import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ActivityCard from '../ActivityCard';
import { activities } from '../../data/staticData';
import styles from './Activities.module.scss';
import { useCurrency } from '../../context/CurrencyContext';

interface ActivitiesProps {
  title?: string;
  location?: string;
  showAllActivities?: boolean;
}

const Activities: React.FC<ActivitiesProps> = ({
  title = "Featured Dubai Activities",
  location = "Dubai",
  showAllActivities = false
}) => {
  const { selectedCurrency } = useCurrency();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  
  // Filter activities based on location or show all
  const filteredActivities = showAllActivities
    ? activities
    : activities.filter(activity => activity.location === location);
  
  // Check scroll position for button visibility
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer for calculation errors
  };
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);
  
  // Handle scroll buttons
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 600; // Adjust based on your card width + gap
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className={styles.activitiesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <Link href={`/activities?location=${location}`} className={styles.viewAllButton}>
          View All <FaArrowRight className={styles.arrowIcon} />
        </Link>
      </div>
      
      <div className={styles.carouselContainer}>
        {showLeftButton && (
          <button 
            className={`${styles.carouselButton} ${styles.leftButton}`}
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
        )}
        
        <div className={styles.activitiesScroll} ref={scrollContainerRef}>
          {filteredActivities.map((activity) => (
            <div key={activity.id} className={styles.activityWrapper}>
              <ActivityCard 
                image={activity.image}
                title={activity.title}
                duration={activity.duration}
                rating={activity.rating}
                reviews={activity.reviews}
                originalPrice={activity.price}
                discountedPrice={Math.round(activity.price * 0.8)}
                savings={Math.round(activity.price * 0.2)}
              />
            </div>
          ))}
        </div>
        
        {showRightButton && (
          <button 
            className={`${styles.carouselButton} ${styles.rightButton}`}
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Activities; 