import React from 'react';
import { focusTours } from '../../data/staticData';
import { TourPackage } from '../../types/staticData';
import SectionHeading from '../SectionHeading';
import TourCard from '../TourCard';
import styles from './FeaturedHolidays.module.scss';

interface FeaturedHolidaysProps {
  tours?: TourPackage[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  showViewAll?: boolean;
}

const FeaturedHolidays: React.FC<FeaturedHolidaysProps> = ({
  tours,
  eyebrow = 'Holidays',
  heading = 'Featured holidays',
  description = 'Flight-inclusive and land-only packages. Open a card for inclusions and the enquiry form.',
  showViewAll = true,
}) => {
  const featured = tours ?? focusTours.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className={styles.section} id="featured-holidays" aria-labelledby="featured-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow={eyebrow}
          icon="umbrella"
          title={heading}
          titleId="featured-heading"
          description={description}
          action={showViewAll ? { href: '/#destinations', label: 'See destinations' } : undefined}
        />

        <div className={styles.grid}>
          {featured.map((tour) => (
            <TourCard
              key={tour.id}
              id={tour.id}
              images={tour.images}
              title={tour.title}
              duration={tour.duration}
              rating={tour.rating}
              reviews={tour.reviews}
              originalPrice={tour.originalPrice}
              discountedPrice={tour.discountedPrice}
              savings={tour.savings}
              locations={tour.locations}
              showCustomize={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHolidays;
