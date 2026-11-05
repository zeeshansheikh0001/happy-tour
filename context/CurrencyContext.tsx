import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { currencies } from '../data/staticData';
import { Currency } from '../types/staticData';

const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
};

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency>>;
  convertPrice: (priceInINR: number) => number;
  formatPrice: (price: number) => string;
}

const defaultCurrency = currencies.find((c) => c.code === 'INR') || currencies[0];

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
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      try {
        const parsedCurrency = JSON.parse(savedCurrency);
        const validCurrency = currencies.find((c) => c.code === parsedCurrency.code);
        if (validCurrency) {
          setSelectedCurrency(validCurrency);
        }
      } catch (e) {
        console.error('Error parsing saved currency', e);
      }
    }
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
  }, [hasHydrated, selectedCurrency]);

  const convertPrice = useCallback((priceInINR: number): number => {
    if (!priceInINR) return 0;

    const rate = exchangeRates[selectedCurrency.code as keyof typeof exchangeRates] || 1;
    return Math.round(priceInINR * rate);
  }, [selectedCurrency.code]);

  const formatPrice = useCallback((price: number): string => {
    if (typeof price !== 'number') return `${selectedCurrency.symbol}0`;

    return `${selectedCurrency.symbol}${price.toLocaleString()}`;
  }, [selectedCurrency.symbol]);

  const value = useMemo(
    () => ({ selectedCurrency, setSelectedCurrency, convertPrice, formatPrice }),
    [selectedCurrency, convertPrice, formatPrice],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
