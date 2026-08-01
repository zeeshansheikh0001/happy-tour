import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaCommentAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import styles from './TourDetails.module.scss';
import { useCurrency } from '../../context/CurrencyContext';

export interface ImageGalleryProps {
  mainImage: {
    src: string;
    alt: string;
  };
  thumbnails: {
    id: string;
    src: string;
    alt: string;
    label: string;
  }[];
  className?: string;
}

const TourDetails: React.FC<ImageGalleryProps> = ({ mainImage, thumbnails, className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentModalImage, setCurrentModalImage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Combine main image with thumbnails for carousel and modal
  const allImages = [mainImage, ...thumbnails.map(thumb => ({ src: thumb.src, alt: thumb.alt }))];

  // Navigate carousel
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % thumbnails.length);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: (currentSlide + 1) * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + thumbnails.length) % thumbnails.length);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: (currentSlide - 1) * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  // Navigate modal
  const nextModalImage = () => {
    setCurrentModalImage(prev => (prev + 1) % allImages.length);
  };

  const prevModalImage = () => {
    setCurrentModalImage(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  // Open modal with specific image
  const openModal = (index: number) => {
    setCurrentModalImage(index);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };
  
  return (
    <>
      <div className={`${styles.galleryContainer} ${className || ''}`}>
        <div className={styles.mainImageContainer} onClick={() => openModal(0)}>
          <Image 
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            className={styles.mainImage}
            priority
          />
        </div>
        
        {isMobile ? (
          <div className={styles.carouselContainer}>
            <div className={styles.carousel} ref={carouselRef}>
              {thumbnails.map((thumbnail, index) => (
                <div key={thumbnail.id} className={styles.carouselItem} onClick={() => openModal(index + 1)}>
                  <Image 
                    src={thumbnail.src}
                    alt={thumbnail.alt}
                    fill
                    className={styles.thumbnailImage}
                  />
                  <div className={styles.thumbnailLabel}>
                    {thumbnail.label}
                  </div>
                </div>
              ))}
            </div>
            <button className={`${styles.carouselNav} ${styles.prevBtn}`} onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            <button className={`${styles.carouselNav} ${styles.nextBtn}`} onClick={nextSlide}>
              <FaChevronRight />
            </button>
            <div className={styles.carouselDots}>
              {thumbnails.map((_, index) => (
                <span 
                  key={index} 
                  className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
                  onClick={() => {
                    setCurrentSlide(index);
                    if (carouselRef.current) {
                      carouselRef.current.scrollTo({
                        left: index * carouselRef.current.offsetWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.thumbnailsGrid}>
            {thumbnails.map((thumbnail, index) => (
              <div key={thumbnail.id} className={styles.thumbnailItem} onClick={() => openModal(index + 1)}>
                <Image 
                  src={thumbnail.src}
                  alt={thumbnail.alt}
                  fill
                  className={styles.thumbnailImage}
                />
                <div className={styles.thumbnailLabel}>
                  {thumbnail.label}
                </div>
              </div>
            ))}
            
            <button className={styles.viewAllButton} onClick={() => openModal(0)}>
              <FaCommentAlt className={styles.viewAllIcon} />
              <span>View All Images</span>
            </button>
          </div>
        )}
      </div>

      {/* Image Gallery Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className={styles.modalImageContainer}>
              <Image 
                src={allImages[currentModalImage].src}
                alt={allImages[currentModalImage].alt}
                fill
                className={styles.modalImage}
              />
            </div>
            
            <button 
              className={`${styles.modalNav} ${styles.modalPrev}`} 
              onClick={prevModalImage}
            >
              <FaChevronLeft />
            </button>
            
            <button 
              className={`${styles.modalNav} ${styles.modalNext}`} 
              onClick={nextModalImage}
            >
              <FaChevronRight />
            </button>
            
            <div className={styles.modalCounter}>
              {currentModalImage + 1} / {allImages.length}
            </div>
            
            <div className={styles.modalThumbnails}>
              {allImages.map((image, index) => (
                <div 
                  key={index}
                  className={`${styles.modalThumbnail} ${currentModalImage === index ? styles.activeThumbnail : ''}`}
                  onClick={() => setCurrentModalImage(index)}
                >
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={60}
                    className={styles.modalThumbnailImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourDetails; 