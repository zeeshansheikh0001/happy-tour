import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaStar, FaPhone, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './TourCard.module.scss';
import TourModal from '../TourModal';
import { useCurrency } from '../../context/CurrencyContext';

interface TourCardProps {
  id: number;
  images: string[];
  title: string;
  duration: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  locations: {
    days: number;
    place: string;
  }[];
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  images,
  title,
  duration,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  savings,
  locations,
}) => {
  const router = useRouter();
  const { convertPrice, formatPrice } = useCurrency();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Convert prices using currency context
  const convertedDiscountedPrice = convertPrice(discountedPrice);
  const convertedOriginalPrice = convertPrice(originalPrice);
  const convertedSavings = convertPrice(savings);

  const nextSlide = () => {
    if (animating) return;
    
    setSlideDirection('slide-left');
    setAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      
      setTimeout(() => {
        setAnimating(false);
        setSlideDirection('');
      }, 50);
    }, 300);
  };
  
  const prevSlide = () => {
    if (animating) return;
    
    setSlideDirection('slide-right');
    setAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      
      setTimeout(() => {
        setAnimating(false);
        setSlideDirection('');
      }, 50);
    }, 300);
  };
  
  const goToSlide = (index: number) => {
    if (animating) return;
    
    const direction = index > currentSlide ? 'slide-left' : 'slide-right';
    setSlideDirection(direction);
    setAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      
      setTimeout(() => {
        setAnimating(false);
        setSlideDirection('');
      }, 50);
    }, 300);
  };

  const handleCardClick = () => {
    // Create a URL-friendly slug from the tour title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
    
    router.push(`/tours/${slug}`);
  };

  const handleRequestCallback = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    setIsModalOpen(true);
  };
    
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.tourCard} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <div className={`${styles.carousel} ${slideDirection ? styles[slideDirection] : ''}`}>
          <Image
            src={images[currentSlide]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            unoptimized={images[currentSlide].startsWith('http')} />
        </div>
        <button
          className={styles.carouselNav + ' ' + styles.prevBtn}
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          } }
          disabled={animating}
        >
          <FaChevronLeft />
        </button>
        <button
          className={styles.carouselNav + ' ' + styles.nextBtn}
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          } }
          disabled={animating}
        >
          <FaChevronRight />
        </button>
        <div className={styles.indicator}>
          {images.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? styles.activeDot : styles.dot}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              } }
            ></span>
          ))}
        </div>
      </div>

      <div className={styles.metaInfo}>
        <div className={styles.duration}>{duration}</div>
        <div className={styles.rating}>
          <span className={styles.starIcon}>
            <FaStar />
          </span>
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
          <span className={styles.reviews}>({reviews})</span>
        </div>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.locationInfo}>
        {locations.map((location, index) => (
          <React.Fragment key={index}>
            <span className={styles.locationDays}>{location.days}D</span>
            <span className={styles.locationName}>{location.place}</span>
            {index < locations.length - 1 && <span className={styles.locationDot}>•</span>}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.priceSection}>
        <div className={styles.priceContainer}>
          <span className={styles.discountedPrice}>{formatPrice(convertedDiscountedPrice)}</span>
          <span className={styles.originalPrice}>{formatPrice(convertedOriginalPrice)}</span>
        </div>
        <div className={styles.savingsLabel}>
          SAVE {formatPrice(convertedSavings)}
        </div>
      </div>

      <div className={styles.actions}>
      <button
  className={styles.callButton}
  onClick={(e) => {
    e.stopPropagation();
    window.location.href = 'tel:+917275722307';
  }}
>
  <FaPhone />
</button>
        <button
          className={styles.requestButton}
          onClick={handleRequestCallback}
        >
          Request Callback
        </button>
  </div>

      {/* Tour Modal */}
      <TourModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tourName={title}
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
        savings={savings}
        tourImage={images[currentSlide]}
      />
    </div>
  );
};

export default TourCard; 