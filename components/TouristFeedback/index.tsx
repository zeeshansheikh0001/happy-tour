import React, { useRef, useState } from 'react';
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
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = items.flatMap((item) => {
    const place = holidayDestinations.find((destination) => destination.id === item.destinationId);
    if (!place) return [];
    return [{ ...item, image: place.image, tripLabel: item.trip || place.name }];
  });

  const updateActiveIndex = (node: HTMLUListElement) => {
    const card = node.querySelector<HTMLElement>(`.${styles.card}`);
    const gap = Number.parseFloat(getComputedStyle(node).columnGap) || 0;
    const step = (card?.offsetWidth || node.clientWidth) + gap;
    if (step <= 0) return;
    const next = Math.min(cards.length - 1, Math.max(0, Math.round(node.scrollLeft / step)));
    setActiveIndex((current) => (current === next ? current : next));
  };

  const scrollToCard = (index: number) => {
    const node = scrollerRef.current;
    const card = node?.children.item(index) as HTMLElement | null;
    if (!node || !card) return;
    const padding = Number.parseFloat(getComputedStyle(node).paddingLeft) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollTo({
      left: card.offsetLeft - padding,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

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

        <ul
          ref={scrollerRef}
          className={cards.length === 1 ? `${styles.grid} ${styles.gridSingle}` : styles.grid}
          onScroll={(event) => updateActiveIndex(event.currentTarget)}
        >
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
        {cards.length > 1 && (
          <div className={styles.dots}>
            {cards.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === activeIndex ? `${styles.dot} ${styles.dotOn}` : styles.dot}
                aria-label={`Show review ${index + 1} of ${cards.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </div>
        )}
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
