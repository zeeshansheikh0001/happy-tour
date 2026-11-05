import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { holidayDestinations } from '../../data/staticData';
import SectionHeading from '../SectionHeading';
import styles from './DestinationGrid.module.scss';

const areaById: Record<string, string> = {
  dubai: styles.dubai,
  vietnam: styles.hanoi,
  ladakh: styles.ladakh,
  kashmir: styles.kashmir,
  'north-east-india': styles.northeast,
};

const DestinationGrid: React.FC = () => (
  <section className={styles.section} id="destinations" aria-labelledby="destinations-heading">
    <div className={styles.inner}>
      <SectionHeading
        eyebrow="Destinations"
        icon="map"
        title="Where do you want to go?"
        titleId="destinations-heading"
        description="Dubai, Vietnam, Ladakh, Kashmir, and North East India."
      />

      <div className={styles.grid}>
        {holidayDestinations.map((destination) => (
          <Link
            key={destination.id}
            href={`/?destination=${destination.id}`}
            className={`${styles.card} ${areaById[destination.id] ?? ''}`}
          >
            <Image
              src={destination.image}
              alt=""
              fill
              sizes="(max-width: 767px) 50vw, 25vw"
              className={styles.image}
              unoptimized
            />
            <span className={styles.pill}>{destination.name}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default DestinationGrid;
