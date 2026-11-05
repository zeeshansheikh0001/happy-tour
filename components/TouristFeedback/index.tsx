import React from 'react';
import Image from 'next/image';
import { holidayDestinations, touristFeedback } from '../../data/staticData';
import { TouristFeedback as TouristFeedbackItem } from '../../types/staticData';
import SectionHeading from '../SectionHeading';
import styles from './TouristFeedback.module.scss';

interface TouristFeedbackProps {
  items?: TouristFeedbackItem[];
}

// Placeholder totals until real review numbers are available.
const DUMMY_SCORE = '4.9/5';
const DUMMY_TRAVELERS = '2,500+ happy travelers';

const TouristFeedback: React.FC<TouristFeedbackProps> = ({ items = touristFeedback }) => {
  const cards = items.flatMap((item) => {
    const place = holidayDestinations.find((destination) => destination.id === item.destinationId);
    if (!place) return [];
    return [{ ...item, image: place.image, tripLabel: item.trip || place.name }];
  });

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} id="tourist-feedback" aria-labelledby="tourist-feedback-heading">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <SectionHeading
            align="center"
            eyebrow="Feedback"
            icon="star"
            title="Good trips. Great memories."
            titleId="tourist-feedback-heading"
            description="A few words from our happy travelers."
          />
          <p className={styles.score}>
            <Stars label={`Rated ${DUMMY_SCORE}`} />
            <strong>{DUMMY_SCORE}</strong>
            <span className={styles.scoreRule} aria-hidden="true" />
            <span>{DUMMY_TRAVELERS}</span>
          </p>
        </header>

        <ul className={styles.grid}>
          {cards.map((item) => (
            <li key={item.id} className={styles.card}>
              <div className={styles.photo}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 360px"
                  className={styles.image}
                  unoptimized
                />
              </div>
              <Stars />
              <blockquote className={styles.quote}>
                <p>“{item.quote}”</p>
              </blockquote>
              <footer className={styles.person}>
                <Image src={item.avatar} alt="" width={40} height={40} className={styles.avatar} />
                <span>
                  <cite className={styles.name}>{item.name}</cite>
                  <span className={styles.location}>{item.location}</span>
                </span>
              </footer>
              <p className={styles.trip}>{item.tripLabel}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

function Stars({ label }: { label?: string }) {
  return (
    <span className={styles.stars} role="img" aria-label={label} aria-hidden={label ? undefined : true}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.8l2.1 4.6 5 .6-3.7 3.4.9 5-4.3-2.4L5.7 15.4l.9-5L2.9 7l5-.6L10 1.8z" />
        </svg>
      ))}
    </span>
  );
}

export default TouristFeedback;
