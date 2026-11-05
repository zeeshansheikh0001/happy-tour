import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { ExternalIcon, StarIcon } from '../Icons';
import styles from './TourReviews.module.scss';
import TravelersGallery, { TravelerPhoto } from '../TravelersGallery';
import SectionHeading from '../SectionHeading';

export interface Rating {
  stars: number;
  count: number;
}

export interface ReviewPhoto {
  src: string;
  alt: string;
}

export interface Review {
  id: number;
  name: string;
  profileImage: string;
  date: string;
  rating: number;
  tourBooked: string;
  tourLink?: string;
  comment: string;
  photos: ReviewPhoto[];
}

export interface TourReviewsProps {
  overallRating: number;
  totalReviews: number;
  countriesCount: number;
  ratings: Rating[];
  travelerPhotos: TravelerPhoto[];
  reviews: Review[];
  showGallery?: boolean;
  title?: string;
  tourName?: string;
}

const TourReviews: React.FC<TourReviewsProps> = ({
  overallRating,
  totalReviews,
  countriesCount,
  ratings,
  travelerPhotos,
  reviews,
  showGallery = true,
  title = "Traveler Reviews",
  tourName
}) => {
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const toggleReviewExpansion = useCallback((reviewId: number) => {
    setExpandedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId) 
        : [...prev, reviewId]
    );
  }, []);

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const amount: 0 | 0.5 | 1 = rating >= index + 1 ? 1 : rating >= index + 0.5 ? 0.5 : 0;
      return (
        <StarIcon
          key={index}
          size={18}
          amount={amount}
          className={amount === 0 ? styles.starIconEmpty : styles.starIcon}
        />
      );
    });
  }, []);

  // Format large numbers with K suffix
  const formatLargeNumber = useCallback((num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
  }, []);

  // Calculate max rating count for the bar width
  const maxRatingCount = Math.max(...ratings.map(r => r.count));

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsHeader}>
        <SectionHeading
          eyebrow="Reviews"
          icon="star"
          title={title}
          description={tourName ? `Notes from travelers on ${tourName}.` : 'Notes from travelers on this holiday.'}
        />
        {tourName && <div className={styles.tourName}>{tourName}</div>}
      </div>

      <div className={styles.ratingsOverview}>
        <div className={styles.overallRating}>
          <div className={styles.ratingNumber}>{overallRating.toFixed(1)}</div>
          <div className={styles.starsDisplay}>
            {renderStars(overallRating)}
          </div>
          <div className={styles.reviewStats}>
            <span className={styles.totalReviews}>{formatLargeNumber(totalReviews)} reviews</span>
            <a href="#" className={styles.countriesLink}>
              From {countriesCount}+ countries
            </a>
          </div>
        </div>
        
        <div className={styles.ratingsDistribution}>
          {ratings.map((rating, index) => (
            <div key={index} className={styles.ratingBar}>
              <div className={styles.starLabel}>
                {rating.stars}
                <StarIcon size={12} />
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={styles.barFill} 
                  style={{ 
                    width: `${(rating.count / maxRatingCount) * 100}%` 
                  }}
                ></div>
              </div>
              <div className={styles.ratingCount}>
                {formatLargeNumber(rating.count)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.reviewsList}>
        <h3 className={styles.reviewsListTitle}>Recent Reviews</h3>
        {reviews.length === 0 ? (
          <div className={styles.noReviews}>No reviews yet for this tour.</div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerImage}>
                    <Image 
                      src={review.profileImage} 
                      alt={`${review.name}'s profile`} 
                      width={50} 
                      height={50}
                      className={styles.profileImage}
                    />
                  </div>
                  <div className={styles.reviewerDetails}>
                    <h4 className={styles.reviewerName}>{review.name}</h4>
                    <div className={styles.reviewDate}>Reviewed: {review.date}</div>
                  </div>
                </div>
                <div className={styles.reviewRating}>
                  {renderStars(review.rating)}
                  <span className={styles.ratingText}>{review.rating.toFixed(1)}/5</span>
                </div>
              </div>
              
              <div className={styles.reviewContent}>
                <div className={styles.bookedTour}>
                  <span>Booked: </span>
                  <a href={review.tourLink} className={styles.tourLink}>
                    {review.tourBooked}
                    {review.tourLink && <ExternalIcon size={12} className={styles.linkIcon} />}
                  </a>
                </div>
                
                <p className={styles.reviewText}>
                  {expandedReviews.includes(review.id) 
                    ? review.comment 
                    : `${review.comment.substring(0, 200)}${review.comment.length > 200 ? '...' : ''}`
                  }
                  {review.comment.length > 200 && (
                    <button 
                      className={styles.readMoreButton}
                      onClick={() => toggleReviewExpansion(review.id)}
                    >
                      {expandedReviews.includes(review.id) ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </p>
              </div>
              
              {review.photos.length > 0 && (
                <div className={styles.reviewGalleryWrapper}>
                  <TravelersGallery photos={review.photos} title="" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default memo(TourReviews);