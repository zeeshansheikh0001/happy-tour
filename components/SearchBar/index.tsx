import React, { useState, useEffect, useRef } from 'react';
import Icon3D from '../Icon3D';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  placeholder?: string;
}

const SEARCH_DESTINATIONS = [
  'Dubai',
  'Hanoi',
  'Ladakh',
  'Kashmir',
  'North East India',
] as const;

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const typingInterval = 120;
    const deletingInterval = 80;
    const wordPause = 1500;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (isTyping) {
      const word = SEARCH_DESTINATIONS[currentWord];
      
      if (!isDeleting) {
        timeout = setTimeout(() => {
          setDisplayText(word.substring(0, currentIndex + 1));
          
          if (currentIndex >= word.length - 1) {
            setIsTyping(false);
            pauseTimeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
              setIsTyping(true);
            }, wordPause);
          } else {
            setCurrentIndex(currentIndex + 1);
          }
        }, typingInterval);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(word.substring(0, currentIndex - 1));
          
          if (currentIndex <= 1) {
            setIsDeleting(false);
            setCurrentWord((currentWord + 1) % SEARCH_DESTINATIONS.length);
            setCurrentIndex(0);
          } else {
            setCurrentIndex(currentIndex - 1);
          }
        }, deletingInterval);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentIndex, currentWord, isDeleting, isTyping]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleInputFocus = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className={styles['search-bar']}>
      <form onSubmit={handleSearch}>
        <div 
          className={styles['search-bar__container']} 
          onClick={handleInputFocus}
        >
          <Icon3D name="search" size={18} className={styles['search-bar__icon']} />
          <input
            ref={searchInputRef}
            type="text"
            className={styles['search-bar__input']}
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {!searchQuery && (
            <div className={styles['search-bar__placeholder']}>
              <span>Search for </span>
              <span className={styles['search-bar__destination']}>
                {displayText}
              </span>
              <span className={styles['search-bar__cursor']}></span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 