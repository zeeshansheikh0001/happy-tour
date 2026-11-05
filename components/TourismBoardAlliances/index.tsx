import React from 'react';
import { tourismBoardAlliances } from '../../data/staticData';
import SectionHeading from '../SectionHeading';
import styles from './TourismBoardAlliances.module.scss';

const FONT = 'var(--font-figtree), sans-serif';

function JapanLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 168 52" role="img" aria-hidden="true">
      <path
        fill="#e10600"
        d="M22 7c7 1 12 8 10 16-1 5-7 9-12 7 3-5 1-9-3-11 5-1 7-4 4-8-3 3-8 2-10-1 5-2 8-3 11-3z"
      />
      <text x="42" y="24" fill="#161616" fontFamily={FONT} fontSize="16" fontWeight="700">
        Japan.
      </text>
      <text x="42" y="40" fill="#161616" fontFamily={FONT} fontSize="10" fontWeight="500">
        Endless Discovery.
      </text>
    </svg>
  );
}

function FranceLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 132 52" role="img" aria-hidden="true">
      <path fill="#f0b429" d="M92 8l1.6 3.6 3.8.4-2.9 2.5.9 3.7L92 16.4 88.6 18.2l.9-3.7-2.9-2.5 3.8-.4z" />
      <text x="8" y="30" fill="#1d4ed8" fontFamily={FONT} fontSize="24" fontStyle="italic" fontWeight="600">
        France
      </text>
      <text x="22" y="44" fill="#1d4ed8" fontFamily={FONT} fontSize="8" fontWeight="500">
        Rendez-vous en France
      </text>
    </svg>
  );
}

function AbuDhabiLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 132 52" role="img" aria-hidden="true">
      <text x="4" y="18" fill="#6d28a8" fontFamily={FONT} fontSize="12" fontWeight="500">
        experience
      </text>
      <text x="4" y="40" fill="#6d28a8" fontFamily={FONT} fontSize="20" fontWeight="700">
        abu dhabi
      </text>
    </svg>
  );
}

function JordanLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 148 52" role="img" aria-hidden="true">
      <text x="0" y="34" fill="#1b2559" fontFamily={FONT} fontSize="26" fontWeight="800" letterSpacing="0.5">
        J
      </text>
      <circle cx="36" cy="24" r="10" fill="none" stroke="#1b2559" strokeWidth="2.2" />
      <path fill="#1b2559" d="M36 16.5l1.5 3.5 3.7.3-2.8 2.4.9 3.6-3.3-1.9-3.3 1.9.9-3.6-2.8-2.4 3.7-.3z" />
      <text x="50" y="34" fill="#1b2559" fontFamily={FONT} fontSize="26" fontWeight="800" letterSpacing="0.5">
        RDAN
      </text>
    </svg>
  );
}

function SaudiLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 110 52" role="img" aria-hidden="true">
      <text x="4" y="36" fill="#14b8a6" fontFamily={FONT} fontSize="30" fontStyle="italic" fontWeight="600">
        Saudi
      </text>
    </svg>
  );
}

function DubaiLogo() {
  return (
    <svg className={styles.logo} viewBox="0 0 120 52" role="img" aria-hidden="true">
      <text x="2" y="36" fill="#0b74d1" fontFamily={FONT} fontSize="28" fontWeight="800" letterSpacing="1">
        DUBAI
      </text>
    </svg>
  );
}

function BoardLogo({ id }: { id: number }) {
  if (id === 1) return <JapanLogo />;
  if (id === 2) return <FranceLogo />;
  if (id === 3) return <AbuDhabiLogo />;
  if (id === 4) return <JordanLogo />;
  if (id === 5) return <SaudiLogo />;
  return <DubaiLogo />;
}

const TourismBoardAlliances: React.FC = () => {
  if (tourismBoardAlliances.length === 0) return null;

  const loop = [...tourismBoardAlliances, ...tourismBoardAlliances];

  return (
    <section className={styles.section} aria-labelledby="tourism-boards-heading">
      <div className={styles.inner}>
        <SectionHeading
          align="center"
          title="Tourism Board Alliances"
          titleId="tourism-boards-heading"
        />
      </div>
      <div className={styles.viewport}>
        <ul className={styles.track}>
          {loop.map((board, index) => {
            const hidden = index >= tourismBoardAlliances.length;
            return (
              <li key={`${board.id}-${index}`} className={styles.logoItem} aria-hidden={hidden || undefined}>
                <a
                  className={styles.link}
                  href={board.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={hidden ? undefined : board.name}
                  tabIndex={hidden ? -1 : undefined}
                >
                  <BoardLogo id={board.id} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TourismBoardAlliances;
