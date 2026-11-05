import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import styles from './TourModal.module.scss';
import { useCurrency } from '../../context/CurrencyContext';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  tourImage: string;
}

const TourModal: React.FC<TourModalProps> = ({
  isOpen,
  onClose,
  tourName,
  originalPrice,
  discountedPrice,
  savings,
  tourImage
}) => {
  const [countryCode, setCountryCode] = useState('+91');
  const bodyStyleRef = useRef<{ overflow: string }>({ overflow: '' });
  const [isMounted, setIsMounted] = useState(false);
  const onCloseRef = useRef(onClose);
  const { convertPrice, formatPrice } = useCurrency();
  onCloseRef.current = onClose;
  
  // Convert prices using currency context
  const convertedDiscountedPrice = convertPrice(discountedPrice);
  const convertedOriginalPrice = convertPrice(originalPrice);
  const convertedSavings = convertPrice(savings);
  
  // Set mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      // Store the original overflow style
      bodyStyleRef.current.overflow = document.body.style.overflow;
      // Set overflow to hidden to prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore the original overflow style
      document.body.style.overflow = bodyStyleRef.current.overflow;
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = bodyStyleRef.current.overflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  
  const modalContent = (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          <FaTimes />
        </button>
        
        <div className={styles.modalContent}>
          <div className={styles.tourInfo}>
            <div className={styles.imageContainer}>
              <Image 
                src={tourImage}
                alt={tourName}
                fill
                className={styles.tourImage}
                sizes="80px"
                priority
              />
            </div>
            
            <div className={styles.tourDetails}>
              <h3 className={styles.tourName}>{tourName}</h3>
              <div className={styles.priceContainer}>
                <div className={styles.priceWrapper}>
                  <span className={styles.currentPrice}>{formatPrice(convertedDiscountedPrice)}</span>
                  <span className={styles.originalPrice}>{formatPrice(convertedOriginalPrice)}</span>
                </div>
                <div className={styles.savingsTag}>SAVE {formatPrice(convertedSavings)}</div>
              </div>
            </div>
          </div>
          
          <form className={styles.inquiryForm} onSubmit={handleSubmit}>
            <div className={styles.formField}>
              <input 
                type="text" 
                placeholder="Full Name*" 
                className={styles.formInput} 
                required 
              />
            </div>
            
            <div className={styles.formField}>
              <input 
                type="email" 
                placeholder="Email*" 
                className={styles.formInput} 
                required 
              />
            </div>
            
            <div className={styles.phoneField}>
              <div className={styles.countryCodeSelect}>
                <select 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+971">+971</option>
                </select>
              </div>
              <input 
                type="tel" 
                placeholder="Your Phone*" 
                className={styles.phoneInput} 
                required 
              />
            </div>
            
            <div className={styles.rowFields}>
              <div className={styles.formField}>
                <input 
                  type="text" 
                  placeholder="Travel Date*" 
                  className={styles.formInput} 
                  required 
                />
              </div>
              <div className={styles.formField}>
                <input 
                  type="number" 
                  placeholder="Traveller Count*" 
                  className={styles.formInput} 
                  min="1" 
                  required 
                />
              </div>
            </div>
            
            <div className={styles.formField}>
              <textarea 
                placeholder="Message..." 
                className={styles.messageInput}
                rows={4}
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Connect with an Expert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
  // Return null during SSR
  if (!isMounted || !isOpen) return null;
  
  // Use createPortal to render the modal at the root level
  return createPortal(modalContent, document.body);
};

export default TourModal; 