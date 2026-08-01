import React from 'react';
import styles from './CurrencyFlag.module.scss';

interface CurrencyFlagProps {
  countryCode: string;
  className?: string;
}

const CurrencyFlag: React.FC<CurrencyFlagProps> = ({ 
  countryCode,
  className = ''
}) => {
  return (
    <div className={`${styles.flagContainer} ${className}`}>
      <img 
        src={`/images/flags/${countryCode.toLowerCase()}.png`} 
        alt={`${countryCode} flag`} 
        className={styles.flagImage}
      />
    </div>
  );
};

export default CurrencyFlag; 