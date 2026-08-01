import React, { useState, useRef, useEffect } from 'react';
import styles from './NavigationMenu.module.scss';
import { navigationItems } from '../../data/staticData';

interface WaterRipple {
  x: number;
  y: number;
  id: number;
}

interface NavigationMenuProps {
  activeItem?: string;
  onNavigate: (id: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ activeItem = 'explore', onNavigate }) => {
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const [rippleCount, setRippleCount] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  const navItems = navigationItems.map(item => ({
    ...item,
    active: activeItem === item.id,
    icon: React.cloneElement(item.icon, { className: styles['nav-menu__icon'] })
  }));

  // Remove ripple after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples(ripples.slice(1));
      }
    }, 600);
    
    return () => clearTimeout(timer);
  }, [ripples]);

  const handleClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onNavigate(id);
    
    // Create water ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    
    if (navRect) {
      const x = rect.left + rect.width / 2 - navRect.left;
      const y = rect.top + rect.height / 2 - navRect.top;
      
      setRipples([...ripples, { x, y, id: rippleCount }]);
      setRippleCount(prev => prev + 1);
    }
  };

  return (
    <nav className={styles['nav-menu']} ref={navRef}>
      {navItems.map((item, index) => (
        <div key={index}>
          <button 
          type="button"
          onClick={(e) => handleClick(item.id, e)}
          className={`${styles['nav-menu__item']} ${item.active ? styles['nav-menu__item--active'] : ''}`}
        >
         <div className={styles['nav-menu__item-content']}>
          {item.icon}
          <span>{item.name}</span>
          {item.trending && (
            <span className={styles['nav-menu__trending-badge']}>
              Trending
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="10"
              width="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginLeft: '4px', verticalAlign: 'middle' }}
            >
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 17.59 3.41 19l6-6 4 4 6.29-6.3L22 12V6z" />
            </svg>
          </span>
          
          )}
         </div>
        </button>
        </div>
      ))}
      
      {/* Water Ripples */}
      {ripples.map(ripple => (
        <div 
          key={ripple.id}
          className={styles['nav-menu__ripple']}
          style={{ 
            left: ripple.x, 
            top: ripple.y 
          }}
        />
      ))}
    </nav>
  );
};

export default NavigationMenu; 