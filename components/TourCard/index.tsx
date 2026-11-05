import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Icon3D from '../Icon3D';
import styles from './TourCard.module.scss';
import TourModal from '../TourModal';
import { useCurrency } from '../../context/CurrencyContext';
import { createSlug } from '../../utils/slug';

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
  showCustomize?: boolean;
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
  showCustomize = true,
}) => {
  const router = useRouter();
  const { convertPrice, selectedCurrency } = useCurrency();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [animating, setAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const animationTimeouts = useRef<number[]>([]);
  
  // Convert prices using currency context
  const convertedDiscountedPrice = convertPrice(discountedPrice);
  const convertedOriginalPrice = convertPrice(originalPrice);
  const convertedSavings = convertPrice(savings);
  const formatCardPrice = (amount: number) =>
    `${selectedCurrency.code} ${amount.toLocaleString('en-IN')}`;

  useEffect(() => () => {
    animationTimeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, []);

  useEffect(() => {
    if (images.length < 2 || hovering || isModalOpen) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 4500);

    return () => window.clearInterval(timer);
  }, [hovering, images.length, isModalOpen]);

  const runSlideAnimation = (updateSlide: () => void) => {
    const finishId = window.setTimeout(() => {
      updateSlide();
      const resetId = window.setTimeout(() => {
        setAnimating(false);
        setSlideDirection('');
      }, 50);
      animationTimeouts.current.push(resetId);
    }, 300);
    animationTimeouts.current.push(finishId);
  };

  const nextSlide = () => {
    if (animating) return;
    
    setSlideDirection('slide-left');
    setAnimating(true);
    runSlideAnimation(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    });
  };
  
  const prevSlide = () => {
    if (animating) return;
    
    setSlideDirection('slide-right');
    setAnimating(true);
    runSlideAnimation(() => {
      setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    });
  };
  
  const goToSlide = (index: number) => {
    if (animating) return;
    
    const direction = index > currentSlide ? 'slide-left' : 'slide-right';
    setSlideDirection(direction);
    setAnimating(true);
    runSlideAnimation(() => {
      setCurrentSlide(index);
    });
  };

  const handleCardClick = () => {
    router.push(`/tours/${createSlug(title)}`);
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
      <div
        className={styles.imageContainer}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
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
          type="button"
          aria-label="Previous photo"
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
          type="button"
          aria-label="Next photo"
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
            <Icon3D name="star" size={14} />
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
        <div className={styles.priceMeta}>
          <span className={styles.originalPrice}>{formatCardPrice(convertedOriginalPrice)}</span>
          <span className={styles.savingsLabel}>SAVE {formatCardPrice(convertedSavings)}</span>
        </div>
        <div className={styles.discountedPrice}>
          {formatCardPrice(convertedDiscountedPrice)}
          <span className={styles.perAdult}> /Adult</span>
        </div>
      </div>

      <div className={styles.actions}>
      <button
        type="button"
        className={styles.callButton}
        aria-label="Call"
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = 'tel:+917275722307';
        }}
      >
        <svg className={styles.callIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A17 17 0 0 1 4 7a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1l-2.22 2.2z"
          />
        </svg>
      </button>
        <button
          className={styles.requestButton}
          onClick={handleRequestCallback}
        >
          Request Callback
        </button>
        {showCustomize ? (
          <Link
            href={`/customize?package=${createSlug(title)}&id=${id}&source=package-card`}
            className={styles.customizeLink}
            onClick={(event) => event.stopPropagation()}
          >
            Customize this package
          </Link>
        ) : null}
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