import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { tourismBoardAlliances } from '../../data/staticData';
import styles from './TourismBoardAlliances.module.scss';

// Tourism board logo interface
interface TourismBoardLogo {
  id: number;
  name: string;
  logo: string;
  website: string;
}

interface TourismBoardAlliancesProps {
  scrollSpeed?: number; // Speed in pixels per second
}

const TourismBoardAlliances: React.FC<TourismBoardAlliancesProps> = ({ 
  scrollSpeed = 30 
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Create a duplicate array of logos for seamless scrolling
  const allLogos = [...tourismBoardAlliances, ...tourismBoardAlliances];

  useEffect(() => {
    if (!carouselRef.current || isPaused) return;

    let animationFrameId: number;
    let startTime: number;
    let lastScrollPosition = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (!carouselRef.current) return;

      const elapsed = timestamp - startTime;
      // Calculate how many pixels to move based on elapsed time and speed
      const pixelsToMove = (elapsed * scrollSpeed) / 1000;
      
      // Get the scroll position
      const scrollPosition = pixelsToMove % carouselRef.current.scrollWidth;
      
      // Only update scroll position if it has changed significantly
      if (Math.abs(scrollPosition - lastScrollPosition) > 0.5) {
        carouselRef.current.scrollLeft = scrollPosition;
        lastScrollPosition = scrollPosition;
      }

      // If we've scrolled past half of the logos, reset scroll position
      if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
        carouselRef.current.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, scrollSpeed]);

  return (
    <div className={styles.tourismBoardAlliances}>
      <h2 className={styles.heading}>Tourism Board Alliances</h2>
      <div 
        className={styles.carouselContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.carousel} ref={carouselRef}>
          {allLogos.map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <Image 
                src={logo.logo}
                alt={logo.name}
                width={120}
                height={60}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourismBoardAlliances; 