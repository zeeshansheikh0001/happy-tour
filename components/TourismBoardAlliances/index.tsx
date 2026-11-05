import React, { useEffect, useRef, useState } from 'react';
import { tourismBoardAlliances } from '../../data/staticData';
import SectionHeading from '../SectionHeading';
import styles from './TourismBoardAlliances.module.scss';

interface TourismBoardAlliancesProps {
  scrollSpeed?: number;
}

const COPIES = 4;

const TourismBoardAlliances: React.FC<TourismBoardAlliancesProps> = ({ scrollSpeed = 40 }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const pausedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sequence = Array.from({ length: COPIES }, () => tourismBoardAlliances).flat();
  const loop = [...sequence, ...sequence];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport || reducedMotion) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    let frame = 0;
    let last = 0;

    const draw = () => {
      const width = halfRef.current;
      if (width > 0) {
        offsetRef.current = ((offsetRef.current % width) + width) % width;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
    };

    const tick = (now: number) => {
      if (!last) last = now;
      const delta = now - last;
      last = now;
      if (!pausedRef.current) {
        offsetRef.current += (scrollSpeed * delta) / 1000;
      }
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener('resize', measure);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
    };
  }, [reducedMotion, scrollSpeed]);

  if (tourismBoardAlliances.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="tourism-boards-heading">
      <h2 id="tourism-boards-heading" className={styles.heading}>
        Tourism board alliances
      </h2>
      <div
        className={styles.viewport}
        ref={viewportRef}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
      >
        <div className={styles.track} ref={trackRef}>
          {loop.map((board, index) => {
            const hidden = index >= sequence.length;
            return (
              <a
                key={`${board.id}-${index}`}
                className={styles.logoItem}
                href={board.website}
                target="_blank"
                rel="noreferrer"
                aria-label={hidden ? undefined : board.name}
                aria-hidden={hidden || undefined}
                tabIndex={hidden ? -1 : undefined}
              >
                <BoardLogo id={board.id} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TourismBoardAlliances;

function BoardLogo({ id }: { id: number }) {
  if (id === 1) return <VisitDubaiLogo />;
  if (id === 2) return <VietnamLogo />;
  return <IndiaLogo />;
}

function VisitDubaiLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 168 48" role="img" aria-hidden="true">
      <rect x="2" y="6" width="36" height="36" rx="10" fill="#1C2430" />
      <circle cx="20" cy="16" r="3.5" fill="#C4A574" />
      <rect x="11" y="26" width="4" height="8" rx="1" fill="#F4F1EA" />
      <rect x="18" y="21" width="4" height="13" rx="1" fill="#F4F1EA" />
      <rect x="25" y="24" width="4" height="10" rx="1" fill="#F4F1EA" />
      <text x="48" y="20" fill="#8A93A0" fontFamily="var(--font-figtree), sans-serif" fontSize="11" letterSpacing="1.6">
        VISIT
      </text>
      <text x="48" y="38" fill="#1C2430" fontFamily="var(--font-figtree), sans-serif" fontSize="18" fontWeight="700">
        Dubai
      </text>
    </svg>
  );
}

function VietnamLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 196 48" role="img" aria-hidden="true">
      <circle cx="20" cy="24" r="16" fill="#DA251D" />
      <path
        d="M20 12c1.6 3.4 1.6 6.2 0 9.2-1.6-3-1.6-5.8 0-9.2zm0 14.8c1.6-3 1.6-5.8 0-9.2 1.6 3.4 1.6 6.2 0 9.2zM12.2 17.2c3.6.6 6.2 2.2 8.4 4.6-3.2-1.2-6-1.6-8.4-4.6zm15.6 0c-2.4 3-5.2 3.4-8.4 4.6 2.2-2.4 4.8-4 8.4-4.6zM12.2 30.8c2.4-3 5.2-3.4 8.4-4.6-2.2 2.4-4.8 4-8.4 4.6zm15.6 0c-3.6-.6-6.2-2.2-8.4-4.6 3.2 1.2 6 1.6 8.4 4.6z"
        fill="#ffffff"
      />
      <text x="44" y="22" fill="#1C2430" fontFamily="var(--font-figtree), sans-serif" fontSize="16" fontWeight="700">
        Vietnam
      </text>
      <text x="44" y="38" fill="#DA251D" fontFamily="var(--font-figtree), sans-serif" fontSize="11" letterSpacing="1.8">
        TOURISM
      </text>
    </svg>
  );
}

function IndiaLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 210 48" role="img" aria-hidden="true">
      <circle cx="20" cy="24" r="15" fill="none" stroke="#FF9933" strokeWidth="3" />
      <circle cx="20" cy="24" r="6" fill="#138808" />
      <text x="44" y="20" fill="#1C2430" fontFamily="var(--font-figtree), sans-serif" fontSize="12" letterSpacing="0.4">
        Incredible
      </text>
      <text x="44" y="38" fill="#FF9933" fontFamily="var(--font-figtree), sans-serif" fontSize="18" fontWeight="700">
        India
      </text>
    </svg>
  );
}
