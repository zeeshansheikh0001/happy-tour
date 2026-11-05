import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { heroSlides } from '../../data/staticData';
import { HeroSlide } from '../../types/staticData';
import TripPlanner from '../TripPlanner';
import styles from './HeroSlider.module.scss';

interface HeroSliderProps {
  activeDestination?: string;
  onSelectDestination?: (id: string) => void;
}

const SLIDE_MS = 7000;

const scenes: Record<string, { title: string; place: string }> = {
  '': {
    title: 'Dubai, Vietnam, and India.',
    place: 'Halong Bay, Vietnam',
  },
  dubai: {
    title: 'A city break with a desert evening.',
    place: 'Dubai, UAE',
  },
  vietnam: {
    title: 'Hanoi, Halong, and the coast.',
    place: 'Halong Bay, Vietnam',
  },
  ladakh: {
    title: 'High passes and slow mountain days.',
    place: 'Ladakh, India',
  },
  kashmir: {
    title: 'Dal Lake mornings and valley stays.',
    place: 'Dal Lake, Kashmir',
  },
  'north-east-india': {
    title: 'Valleys, tea gardens, and slow travel.',
    place: 'North East India',
  },
};

const assurances = [
  { label: 'Handpicked itineraries', icon: <RouteIcon /> },
  { label: 'Local expert planning', icon: <ShieldIcon /> },
  { label: 'Trip support on call', icon: <PhoneIcon /> },
  { label: 'No payment now', icon: <TagIcon /> },
];

const HeroSlider: React.FC<HeroSliderProps> = ({ activeDestination = '' }) => {
  const scene = scenes[activeDestination] ?? scenes[''];
  const slides = useMemo(() => {
    const matched = activeDestination
      ? heroSlides.filter((slide) => slide.destinationId === activeDestination)
      : heroSlides;
    return matched.length > 0 ? matched : heroSlides;
  }, [activeDestination]);
  const loop = slides.length > 1 ? [...slides, slides[0]] : slides;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const pausedRef = useRef(false);
  const videosRef = useRef<Array<HTMLVideoElement | null>>([]);
  const active = slides[index % slides.length];
  const pin = scenes[active.destinationId ?? '']?.place ?? active.title;

  useEffect(() => {
    setIndex(0);
    setAnimate(true);
  }, [activeDestination]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduced || slides.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      if (pausedRef.current || document.hidden) {
        return;
      }
      setIndex((current) => current + 1);
    }, SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [reduced, slides.length, activeDestination]);

  useEffect(() => {
    if (index < slides.length) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setAnimate(true));
      });
    }, 860);

    return () => window.clearTimeout(timer);
  }, [index, slides.length]);

  useEffect(() => {
    videosRef.current.forEach((video, videoIndex) => {
      if (!video) {
        return;
      }
      if (videoIndex === index) {
        const play = video.play();
        if (play) {
          play.catch(() => undefined);
        }
        return;
      }
      video.pause();
    });
  }, [index, failedVideos]);

  return (
    <section className={styles.hero} aria-label="Holiday highlights">
      <h1 className={styles.srOnly}>{scene.title}</h1>
      <div
        className={styles.frame}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div
          className={`${styles.track} ${animate ? '' : styles.trackInstant}`}
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {loop.map((slide, slideIndex) => (
            <div className={styles.slide} key={`${slide.id}-${slideIndex}`}>
              <SlideMedia
                slide={slide}
                priority={slideIndex === 0}
                failed={Boolean(failedVideos[slide.id])}
                videoRef={(node) => {
                  videosRef.current[slideIndex] = node;
                }}
                onVideoError={() => {
                  setFailedVideos((current) => ({ ...current, [slide.id]: true }));
                }}
              />
            </div>
          ))}
        </div>
        <p className={styles.caption} aria-hidden="true">{scene.title}</p>
        <p className={styles.pin}>
          <PinIcon />
          {pin}
        </p>
      </div>
      <div className={styles.dock}>
        <TripPlanner
          variant="bar"
          defaultDestination={activeDestination}
          lockDestination={Boolean(activeDestination)}
        />
      </div>
      <ul className={styles.assurances}>
        {assurances.map((item) => (
          <li key={item.label}>
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

function SlideMedia({
  slide,
  priority,
  failed,
  videoRef,
  onVideoError,
}: {
  slide: HeroSlide;
  priority: boolean;
  failed: boolean;
  videoRef: (node: HTMLVideoElement | null) => void;
  onVideoError: () => void;
}) {
  if (slide.type === 'video' && !failed) {
    return (
      <video
        ref={videoRef}
        className={styles.media}
        src={slide.src}
        poster={slide.poster}
        muted
        playsInline
        loop
        autoPlay={priority}
        preload="metadata"
        onError={onVideoError}
      />
    );
  }

  return (
    <Image
      src={slide.type === 'image' ? slide.src : slide.poster}
      alt={slide.title}
      fill
      priority={priority}
      unoptimized
      sizes="100vw"
      className={styles.media}
    />
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

const stroke = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function RouteIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <path d="M4 17l5-9 4 5 7-8" />
      <path d="M15 5h5v5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <path d="M12 3.5l7 3v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6.5l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <path d="M8 4.5h2.2l1.1 3-1.6 1.1a12 12 0 0 0 5.7 5.7l1.1-1.6 3 1.1V16a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 6 5.7 2 2 0 0 1 8 4.5z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg {...stroke} aria-hidden="true">
      <path d="M4 12.5V5h7.5l8 8-7.5 7.5-8-8z" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default HeroSlider;
