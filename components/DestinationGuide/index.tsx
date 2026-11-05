import React from 'react';
import { destinationGuides } from '../../data/staticData';
import SectionHeading from '../SectionHeading';
import styles from './DestinationGuide.module.scss';

interface DestinationGuideProps {
  destinationId: string;
}

const DestinationGuide: React.FC<DestinationGuideProps> = ({ destinationId }) => {
  const guide = destinationGuides.find((item) => item.id === destinationId);
  if (!guide) return null;

  return (
    <section className={styles.section} id="destination-guide" aria-labelledby="destination-guide-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow={guide.kicker}
          icon="map"
          title={guide.heading}
          titleId="destination-guide-heading"
          description={guide.intro}
        />

        <dl className={styles.facts}>
          {guide.facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <ul className={styles.highlights}>
          {guide.highlights.map((item) => (
            <li key={item.title} className={styles.highlight}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.notes}>
          <h3 className={styles.notesTitle}>Good to know</h3>
          <ul>
            {guide.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DestinationGuide;
