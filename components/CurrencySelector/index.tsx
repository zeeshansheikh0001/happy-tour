import React, { useState, useRef, useEffect } from 'react';
import styles from './CurrencySelector.module.scss';
import { FaChevronDown } from 'react-icons/fa';
import { currencies } from '../../data/staticData';
import { Currency } from '../../types/staticData';
import { useCurrency } from '../../context/CurrencyContext';
import CurrencyFlag from '../CurrencyFlag';

const CurrencySelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };
  
  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);
  
  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  
  return (
    <div className={styles['currency-selector-container']}>
      <button 
        className={styles['currency-selector']}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <CurrencyFlag 
          countryCode={selectedCurrency.countryCode} 
          className={styles['currency-selector__flag']}
        />
        <span className={styles['currency-selector__text']}>{selectedCurrency.code}</span>
        <FaChevronDown className={styles['currency-selector__icon']} />
      </button>
      
      {isOpen && (
        <div 
          className={styles['currency-dropdown']} 
          ref={dropdownRef}
          role="listbox"
          aria-label="Select currency"
        >
          {currencies.map(currency => (
            <button 
              key={currency.code}
              className={`${styles['currency-option']} ${selectedCurrency.code === currency.code ? styles['currency-option--active'] : ''}`}
              onClick={() => handleCurrencyChange(currency)}
              type="button"
              role="option"
              aria-selected={selectedCurrency.code === currency.code}
            >
              <CurrencyFlag 
                countryCode={currency.countryCode} 
                className={styles['currency-option__flag']}
              />
              <span>{currency.code} - {currency.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector; 