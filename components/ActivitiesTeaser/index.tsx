import React, { useMemo } from 'react';
import { activities } from '../../data/staticData';
import ActivityCard from '../ActivityCard';
import SectionHeading from '../SectionHeading';
import styles from './ActivitiesTeaser.module.scss';

interface ActivitiesTeaserProps {
  location?: string;
  heading?: string;
  description?: string;
  showViewAll?: boolean;
}

const DEFAULT_HEADING = 'Day trips, tickets, and cruises';

const ActivitiesTeaser: React.FC<ActivitiesTeaserProps> = ({
  location,
  heading = DEFAULT_HEADING,
  description = 'Add these to a holiday or book them on their own.',
  showViewAll = true,
}) => {
  const items = useMemo(() => {
    const pool = location
      ? activities.filter((activity) => activity.location.toLowerCase() === location.toLowerCase())
      : activities;
    const cruises = pool.filter((activity) => /cruise|yacht|dhow/i.test(activity.title));
    const rest = pool.filter((activity) => !/cruise|yacht|dhow/i.test(activity.title));
    return location ? pool : [...cruises.slice(0, 2), ...rest.slice(0, 4)];
  }, [location]);

  if (items.length === 0) return null;

  return (
    <section className={styles.section} id="activities" aria-labelledby="activities-teaser-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Activities"
          icon="camera"
          title={heading}
          titleId="activities-teaser-heading"
          description={description}
          action={showViewAll ? { href: '/activities', label: 'View all activities' } : undefined}
          showRule
        />

        <div className={styles.grid}>
          {items.map((activity) => (
            <ActivityCard
              key={activity.id}
              id={String(activity.id)}
              image={activity.image}
              title={activity.title}
              duration={activity.duration}
              location={activity.location}
              rating={activity.rating}
              reviews={activity.reviews}
              originalPrice={activity.price}
              discountedPrice={Math.round(activity.price * 0.8)}
              savings={Math.round(activity.price * 0.2)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesTeaser;
