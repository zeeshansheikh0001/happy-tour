import React, { memo } from 'react';
import styles from './TourPackageDetails.module.scss';
import { CheckBadgeIcon, CloseBadgeIcon } from '../Icons';
import SectionHeading from '../SectionHeading';
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
    return text.replace(/(\$|INR|USD|EUR|GBP|AED)\s*(\d+(?:,\d+)*)/g, (match, currencyCode, price) => {
      const numericPrice = parseInt(price.replace(/,/g, ''), 10);
      return formatPrice(numericPrice);
    });
  };
  
  return (
    <div className={styles.packageDetailsContainer}>
      <SectionHeading
        eyebrow="Package"
        icon="clipboard"
        title={title}
        className={styles.packageHeading}
      />
      <div className={styles.packageContent}>
        <h3 className={styles.sectionTitle}>What&apos;s inside the package</h3>
        
        <div className={styles.detailsGrid}>
          <div className={styles.inclusions}>
            <h4 className={styles.columnTitle}>Inclusions</h4>
            <ul className={styles.itemsList}>
              {inclusions.map((item, index) => (
                <li key={index} className={styles.item}>
                  <span className={styles.iconWrapper}>
                    <CheckBadgeIcon size={20} />
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
                    <CloseBadgeIcon size={20} />
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