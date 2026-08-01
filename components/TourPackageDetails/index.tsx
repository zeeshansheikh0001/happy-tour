import React, { memo } from 'react';
import styles from './TourPackageDetails.module.scss';
import Image from 'next/image';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';

export interface InclusionItem {
  text: string;
}

export interface ExclusionItem {
  text: string;
}

export interface TourPackageDetailsProps {
  inclusions: InclusionItem[];
  exclusions: ExclusionItem[];
  title?: string;
  packageTitle?: string;
  location?: string;
  duration?: string;
}

const TourPackageDetails: React.FC<TourPackageDetailsProps> = ({ 
  inclusions, 
  exclusions,
  title = "End Of Trip"
}) => {
  const { formatPrice } = useCurrency();
  
  // Function to process text and convert any price mentions to the selected currency
  const formatPriceInText = (text: string) => {
    // Look for price patterns like "INR 1000", "$1000", etc.
    return text.replace(/(\$|INR|USD|EUR|GBP|AED|SGD)\s*(\d+(?:,\d+)*)/g, (match, currencyCode, price) => {
      const numericPrice = parseInt(price.replace(/,/g, ''), 10);
      return formatPrice(numericPrice);
    });
  };
  
  return (
    <div className={styles.packageDetailsContainer}>      
      <Image src="/images/icons/end-trip.png" alt="Transfer" width={350} height={70} className={styles.packageTitle} />
      <div className={styles.packageContent}>
        <h3 className={styles.sectionTitle}>What's inside the package?</h3>
        
        <div className={styles.detailsGrid}>
          <div className={styles.inclusions}>
            <h4 className={styles.columnTitle}>Inclusions</h4>
            <ul className={styles.itemsList}>
              {inclusions.map((item, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.iconWrapper}>
                    <FaCheck className={styles.iconCheck} />
                  </span>
                  <span className={styles.itemText}>{formatPriceInText(item.text)}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.exclusions}>
            <h4 className={styles.columnTitle}>Exclusions</h4>
            <ul className={styles.itemsList}>
              {exclusions.map((item, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.iconWrapper}>
                    <FaTimes className={styles.iconTimes} />
                  </span>
                  <span className={styles.itemText}>{formatPriceInText(item.text)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TourPackageDetails); 