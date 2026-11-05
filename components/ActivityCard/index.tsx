import React, { useState } from 'react';
import Image from 'next/image';
import ActivityBooking from '../ActivityBooking';
import Icon3D from '../Icon3D';
import styles from './ActivityCard.module.scss';
import { useCurrency } from '../../context/CurrencyContext';

interface ActivityCardProps {
  id?: string;
  image: string;
  title: string;
  duration: string;
  location?: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  id,
  image,
  title,
  duration,
  location,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  savings,
}) => {
  const { convertPrice, selectedCurrency } = useCurrency();
  const [bookingOpen, setBookingOpen] = useState(false);
  const convertedOriginalPrice = convertPrice(originalPrice);
  const convertedDiscountedPrice = convertPrice(discountedPrice);
  const convertedSavings = convertPrice(savings);
  const formatCardPrice = (amount: number) =>
    `${selectedCurrency.code} ${amount.toLocaleString('en-IN')}`;

  return (
    <article className={styles.activityCard}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          unoptimized={image.startsWith('http')}
        />
      </div>

      <div className={styles.metaInfo}>
        <div className={styles.duration}>{duration}</div>
        <div className={styles.rating}>
          <Icon3D name="star" size={14} className={styles.starIcon} />
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
          <span className={styles.reviews}>({reviews})</span>
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.priceSection}>
        <div className={styles.priceMeta}>
          <span className={styles.originalPrice}>{formatCardPrice(convertedOriginalPrice)}</span>
          <span className={styles.savingsLabel}>SAVE {formatCardPrice(convertedSavings)}</span>
        </div>
        <div className={styles.discountedPrice}>
          {formatCardPrice(convertedDiscountedPrice)}
          <span className={styles.perAdult}> /Adult</span>
        </div>
      </div>

      <button type="button" className={styles.bookButton} onClick={() => setBookingOpen(true)}>
        Book Now
      </button>
      <ActivityBooking
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        activityId={id || title}
        title={title}
        place={location || duration}
        image={image}
        priceLabel={`${formatCardPrice(convertedDiscountedPrice)} / adult`}
      />
    </article>
  );
};

export default ActivityCard;
