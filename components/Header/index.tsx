import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import SearchBar from '../SearchBar';
import NavigationMenu from '../NavigationMenu';
import CurrencySelector from '../CurrencySelector';
import LoginButton from '../LoginButton';
import styles from './Header.module.scss';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeNavItem?: string;
  onNavigate: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onTabChange,
  activeNavItem = 'explore',
  onNavigate
}) => {
  // Tab animation variants
  const tabVariants = {
    active: {
      backgroundColor: '#ff7a00',
      color: '#ffffff',
      transition: { duration: 0.3, type: 'spring', stiffness: 300 }
    },
    inactive: {
      backgroundColor: 'transparent',
      color: '#495057',
      transition: { duration: 0.3, type: 'spring', stiffness: 300 }
    }
  };

  return (
    <>
      <div className={styles.header__top_wrapper}>
        <div className={styles.header__top}>
          <div className={styles.header__logo}>
            <Logo />
          </div>
          
          <div className={styles.header__search_container}>
            <SearchBar placeholder="Search for Dubai" />
          </div>
          
          <div className={styles.header__right}>
            <CurrencySelector />
            <LoginButton />
          </div>
        </div>
      </div>
      
      <div className={styles.header__bottom}>
        <div className={styles.header__nav_container}>
          <NavigationMenu activeItem={activeNavItem} onNavigate={onNavigate} />
          
          <div className={styles.header__tabs}>
            <motion.button 
              type="button"
              onClick={() => onTabChange('tours')}
              className={`${styles.header__tab}`}
              variants={tabVariants}
              animate={activeTab === 'tours' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tours
            </motion.button>
            <motion.button 
              type="button"
              onClick={() => onTabChange('activities')}
              className={`${styles.header__tab}`}
              variants={tabVariants}
              animate={activeTab === 'activities' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Activities
            </motion.button>
            <motion.button 
              type="button"
              onClick={() => onTabChange('visa')}
              className={`${styles.header__tab}`}
              variants={tabVariants}
              animate={activeTab === 'visa' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visa
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 