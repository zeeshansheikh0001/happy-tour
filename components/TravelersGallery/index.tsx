import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import styles from './TravelersGallery.module.scss';
import { GALLERY_CONSTANTS } from '../../utils/galleryConstants';

export interface TravelerPhoto {
  src: string;
  alt: string;
}

export interface TravelersGalleryProps {
  photos: TravelerPhoto[];
  title?: string;
}

const TravelersGallery: React.FC<TravelersGalleryProps> = ({ photos, title = '' }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(0);
  
  // State to track if client-side rendering is available (for portal)
  const [isMounted, setIsMounted] = useState(false);
  
  // Check if mobile view - using useCallback to optimize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < GALLERY_CONSTANTS.MOBILE_BREAKPOINT);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Set mounted state when component mounts
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  const openModal = useCallback((index: number) => {
    setCurrentModalImage(index);
    setShowModal(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (!showModal) return;

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = 'var(--scrollbar-width, 15px)';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [showModal]);
  
  // Handle modal image navigation - memoized with useCallback
  const prevModalImage = useCallback(() => {
    setCurrentModalImage((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);
  
  const nextModalImage = useCallback(() => {
    setCurrentModalImage((prev) => (prev + 1) % photos.length);
  }, [photos.length]);
  
  useEffect(() => {
    if (!showModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevModalImage();
      if (e.key === 'ArrowRight') nextModalImage();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, closeModal, prevModalImage, nextModalImage]);
  
  // If no photos, don't render anything
  if (photos.length === 0) return null;
  
  // Determine visible photos and hidden count
  const visibleCount = isMobile 
    ? GALLERY_CONSTANTS.VISIBLE_PHOTOS_MOBILE 
    : GALLERY_CONSTANTS.VISIBLE_PHOTOS_DESKTOP;
  const visiblePhotos = photos.slice(0, visibleCount);
  const hiddenCount = Math.max(0, photos.length - visibleCount);
  
  // Handle view all click
  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Prevent click from bubbling up
    openModal(0); // Open the modal from the first image
  };
  
  return (
    <div className={styles.container}>
      {title && <h3 className={styles.galleryTitle}>{title}</h3>}
      
      <div className={styles.horizontalGallery}>
        {visiblePhotos.map((photo, index) => (
          <div 
            key={index} 
            className={`${styles.galleryItem} ${index === visiblePhotos.length - 1 && hiddenCount > 0 ? styles.lastItem : ''}`}
            onClick={() => openModal(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className={styles.galleryImage}
              loading="lazy"
            />
            
            {/* Overlay for the last visible image if there are more images */}
            {index === visiblePhotos.length - 1 && hiddenCount > 0 && (
              <div 
                className={styles.viewAllOverlay}
                onClick={handleViewAllClick}
                role="button"
                tabIndex={0}
                aria-label={`View all ${photos.length} photos`}
              >
                <div className={styles.viewAllText}>
                  <span>({hiddenCount}+)</span>
                  <span>View All</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Full-screen Modal - use createPortal to ensure it's at the root level */}
      {showModal && isMounted && createPortal(
        <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <FaTimes />
            </button>
            
            <div className={styles.modalImageContainer}>
              <Image
                src={photos[currentModalImage].src}
                alt={photos[currentModalImage].alt}
                fill
                className={styles.modalImage}
                priority={true}
              />
              
              <button 
                className={`${styles.modalNav} ${styles.modalPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  prevModalImage();
                }}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              
              <button 
                className={`${styles.modalNav} ${styles.modalNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  nextModalImage();
                }}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
              
              <div className={styles.modalCounter}>
                {currentModalImage + 1} / {photos.length}
              </div>
            </div>
            
            <div className={styles.modalThumbnails}>
              {photos.map((photo, index) => (
                <div 
                  key={index}
                  className={`${styles.modalThumbnail} ${
                    index === currentModalImage ? styles.activeThumbnail : ''
                  }`}
                  onClick={() => setCurrentModalImage(index)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={80}
                    height={60}
                    className={styles.modalThumbnailImage}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(TravelersGallery); 