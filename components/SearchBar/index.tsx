import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Countries to cycle through
  const countries = [
    'Dubai',
    'Tokyo',
    'Paris',
    'New York',
    'Rome',
    'Bangkok',
    'Singapore',
    'Bali',
  ];

  useEffect(() => {
    // Simple reliable typing animation
    const typingInterval = 120; // Milliseconds between typing actions
    const deletingInterval = 80; // Faster deletion
    const wordPause = 1500; // Pause at complete word

    let timeout: NodeJS.Timeout;

    if (isTyping) {
      const word = countries[currentWord];
      
      if (!isDeleting) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayText(word.substring(0, currentIndex + 1));
          
          if (currentIndex >= word.length - 1) {
            // Reached end of word - pause before deleting
            setIsTyping(false);
            setTimeout(() => {
              setIsDeleting(true);
              setIsTyping(true);
            }, wordPause);
          } else {
            // Continue typing
            setCurrentIndex(currentIndex + 1);
          }
        }, typingInterval);
      } else {
        // Deleting
        timeout = setTimeout(() => {
          setDisplayText(word.substring(0, currentIndex - 1));
          
          if (currentIndex <= 1) {
            // Finished deleting - move to next word
            setIsDeleting(false);
            setCurrentWord((currentWord + 1) % countries.length);
            setCurrentIndex(0);
          } else {
            // Continue deleting
            setCurrentIndex(currentIndex - 1);
          }
        }, deletingInterval);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, currentWord, isDeleting, isTyping, countries]);

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
          <svg className={styles['search-bar__icon']} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
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