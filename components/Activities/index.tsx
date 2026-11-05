import React from 'react';
import ActivityCard from '../ActivityCard';
import SectionHeading from '../SectionHeading';
import { activities } from '../../data/staticData';
import styles from './Activities.module.scss';

interface ActivitiesProps {
  title?: string;
  subtitle?: string;
  location?: string;
  showAllActivities?: boolean;
}

const Activities: React.FC<ActivitiesProps> = ({
  title = 'More Dubai Activities',
  subtitle,
  location = 'Dubai',
  showAllActivities = false,
}) => {
  const filteredActivities = showAllActivities
    ? activities
    : activities.filter((activity) => activity.location === location);

  if (filteredActivities.length === 0) {
    return null;
  }

  return (
    <section className={styles.activitiesSection}>
      <SectionHeading
        eyebrow="Activities"
        icon="camera"
        title={title}
        description={subtitle}
        action={
          showAllActivities
            ? undefined
            : { href: `/activities?location=${location}`, label: 'View all' }
        }
      />

      <div className={styles.activitiesGrid}>
        {filteredActivities.map((activity) => (
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
    </section>
  );
};

export default Activities;
