import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { currencies } from '../data/staticData';
import { Currency } from '../types/staticData';

// Define exchange rates (relative to INR)
const exchangeRates = {
  INR: 1,
  USD: 0.012, // 1 INR = 0.012 USD
  EUR: 0.011, // 1 INR = 0.011 EUR
  GBP: 0.0095, // 1 INR = 0.0095 GBP
  AED: 0.044, // 1 INR = 0.044 AED
  SGD: 0.016, // 1 INR = 0.016 SGD
};

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency>>;
  convertPrice: (priceInINR: number) => number;
  formatPrice: (price: number) => string;
}

const defaultCurrency = currencies.find(c => c.code === 'INR') || currencies[0];

const CurrencyContext = createContext<CurrencyContextType>({
  selectedCurrency: defaultCurrency,
  setSelectedCurrency: () => {},
  convertPrice: () => 0,
  formatPrice: () => '',
});

export const useCurrency = () => useContext(CurrencyContext);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(defaultCurrency);

  // Try to load saved currency from localStorage on initial load
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      try {
        const parsedCurrency = JSON.parse(savedCurrency);
        const validCurrency = currencies.find(c => c.code === parsedCurrency.code);
        if (validCurrency) {
          setSelectedCurrency(validCurrency);
        }
      } catch (e) {
        console.error('Error parsing saved currency', e);
      }
    }
  }, []);

  // Save selected currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  // Convert a price from INR to the selected currency
  const convertPrice = (priceInINR: number): number => {
    if (!priceInINR) return 0;
    
    const rate = exchangeRates[selectedCurrency.code as keyof typeof exchangeRates] || 1;
    return Math.round(priceInINR * rate);
  };

  // Format a price with the selected currency symbol
  const formatPrice = (price: number): string => {
    if (typeof price !== 'number') return `${selectedCurrency.symbol}0`;
    
    return `${selectedCurrency.symbol}${price.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext; 