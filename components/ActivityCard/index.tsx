import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import styles from './ActivityCard.module.scss';
import { useCurrency } from '../../context/CurrencyContext';

interface ActivityCardProps {
  image: string;
  title: string;
  duration: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  image,
  title,
  duration,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  savings,
}) => {
  const { convertPrice, formatPrice } = useCurrency();
  
  // Convert prices using currency context
  const convertedOriginalPrice = convertPrice(originalPrice);
  const convertedDiscountedPrice = convertPrice(discountedPrice);
  const convertedSavings = convertPrice(savings);

  return (
    <div className={styles.activityCard}>
      <div className={styles.imageContainer}>
        <Image 
          src={image} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
          className={styles.image}
          unoptimized={image.startsWith('http')}
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.duration}>{duration}</div>
        
        <div className={styles.rating}>
          <FaStar className={styles.starIcon} />
          <span className={styles.ratingValue}>{rating}</span>
          <span className={styles.reviews}>({reviews}K)</span>
        </div>
        
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
            <span className={styles.discountedPrice}>{formatPrice(convertedDiscountedPrice)}</span>
            <span className={styles.originalPrice}>{formatPrice(convertedOriginalPrice)}</span>
          </div>
          <div className={styles.savingsLabel}>
            SAVE {formatPrice(convertedSavings)}
          </div>
        </div>
        
        <button className={styles.bookButton}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ActivityCard; 