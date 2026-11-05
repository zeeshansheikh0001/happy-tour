import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../Icons';
import Icon3D from '../Icon3D';
import styles from './TourDetails.module.scss';

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
  const [isMounted, setIsMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
  const mobileSlides = [
    { id: 'main', src: mainImage.src, alt: mainImage.alt, label: '' },
    ...thumbnails,
  ];

  const goToSlide = (index: number) => {
    const count = mobileSlides.length;
    if (!count) return;
    const nextIndex = (index + count) % count;
    setCurrentSlide(nextIndex);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: nextIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth',
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

  const openModal = (index: number) => {
    setCurrentModalImage(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
      if (event.key === 'ArrowRight') {
        nextModalImage();
      }
      if (event.key === 'ArrowLeft') {
        prevModalImage();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [showModal]);
  
  return (
    <>
      <div className={`${styles.galleryContainer} ${className || ''}`}>
        {!isMobile && (
          <div className={styles.mainImageContainer} onClick={() => openModal(0)}>
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className={styles.mainImage}
              priority
            />
          </div>
        )}

        {isMobile ? (
          <div className={styles.carouselContainer}>
            <div
              className={styles.carousel}
              ref={carouselRef}
              onScroll={() => {
                const node = carouselRef.current;
                if (!node || !node.offsetWidth) return;
                const index = Math.round(node.scrollLeft / node.offsetWidth);
                setCurrentSlide((current) => (current === index ? current : index));
              }}
            >
              {mobileSlides.map((slide, index) => (
                <div key={slide.id} className={styles.carouselItem} onClick={() => openModal(index)}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className={styles.thumbnailImage}
                    priority={index === 0}
                  />
                  {slide.label ? (
                    <div className={styles.thumbnailLabel}>
                      {slide.label}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <button type="button" className={`${styles.carouselNav} ${styles.prevBtn}`} onClick={() => goToSlide(currentSlide - 1)} aria-label="Previous photo">
              <ChevronLeftIcon />
            </button>
            <button type="button" className={`${styles.carouselNav} ${styles.nextBtn}`} onClick={() => goToSlide(currentSlide + 1)} aria-label="Next photo">
              <ChevronRightIcon />
            </button>
            <div className={styles.carouselDots}>
              {mobileSlides.map((slide, index) => (
                <span
                  key={slide.id}
                  className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
                  onClick={() => goToSlide(index)}
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
            
            <button type="button" className={styles.viewAllButton} onClick={() => openModal(0)}>
              <Icon3D name="camera" alt="" size={18} />
              <span>View all photos</span>
            </button>
          </div>
        )}
      </div>

      {isMounted && showModal && createPortal(
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={closeModal}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Close gallery"
          >
            <CloseIcon size={18} />
          </button>

          <button
            type="button"
            className={`${styles.modalNav} ${styles.modalPrev}`}
            onClick={(event) => {
              event.stopPropagation();
              prevModalImage();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <div
            className={styles.lightboxStage}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={allImages[currentModalImage].src}
              alt={allImages[currentModalImage].alt}
              width={1600}
              height={1066}
              className={styles.modalImage}
              sizes="90vw"
              priority
            />
          </div>

          <button
            type="button"
            className={`${styles.modalNav} ${styles.modalNext}`}
            onClick={(event) => {
              event.stopPropagation();
              nextModalImage();
            }}
            aria-label="Next photo"
          >
            <ChevronRightIcon size={20} />
          </button>

          <div
            className={styles.lightboxBar}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalCounter}>
              {currentModalImage + 1} / {allImages.length}
            </div>
            <div className={styles.modalThumbnails}>
              {allImages.map((image, index) => (
                <button
                  type="button"
                  key={`${image.src}-${index}`}
                  className={`${styles.modalThumbnail} ${currentModalImage === index ? styles.activeThumbnail : ''}`}
                  onClick={() => setCurrentModalImage(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={currentModalImage === index ? true : undefined}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={60}
                    className={styles.modalThumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default TourDetails; 