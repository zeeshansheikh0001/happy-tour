import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import styles from './TourBookingInfo.module.scss';
import TravelersGallery, { TravelerPhoto } from '../TravelersGallery';

interface TourBookingInfoProps {
  // Props can be expanded in the future
}

const TourBookingInfo: React.FC<TourBookingInfoProps> = () => {
  const [expandedPolicies, setExpandedPolicies] = useState<string[]>(['cancellation']);

  const togglePolicy = (policy: string) => {
    setExpandedPolicies(prev => 
      prev.includes(policy)
        ? prev.filter(p => p !== policy)
        : [...prev, policy]
    );
  };

  const isPolicyExpanded = (policy: string) => expandedPolicies.includes(policy);

  // Gallery sample photos
  const samplePhotos: TravelerPhoto[] = [
    { src: '/images/tour-booking/photos/photo1.jpg', alt: 'Tour experience photo 1' },
    { src: '/images/tour-booking/photos/photo2.jpg', alt: 'Tour experience photo 2' },
    { src: '/images/tour-booking/photos/photo3.jpg', alt: 'Tour experience photo 3' },
    { src: '/images/tour-booking/photos/photo4.jpg', alt: 'Tour experience photo 4' },
    { src: '/images/tour-booking/photos/photo5.jpg', alt: 'Tour experience photo 5' },
    { src: '/images/tour-booking/photos/photo6.jpg', alt: 'Tour experience photo 6' },
    { src: '/images/tour-booking/photos/photo7.jpg', alt: 'Tour experience photo 7' },
  ];

  return (
    <div className={styles.bookingInfoContainer}>
      {/* Statistics Section */}
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Image 
              src="/images/icons/hearts.svg" 
              alt="Happy Customers" 
              width={60} 
              height={60} 
            />
          </div>
          <h3 className={styles.statTitle}>10 Million+</h3>
          <p className={styles.statDescription}>
            Happy customers from 65+ countries all around.
          </p>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Image 
              src="/images/icons/star-rating.svg" 
              alt="Rating" 
              width={60} 
              height={60} 
            />
          </div>
          <h3 className={styles.statTitle}>4.6 / 5.0</h3>
          <p className={styles.statDescription}>
            Cumulative ratings of our trips across platforms.
          </p>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Image 
              src="/images/icons/heart.svg" 
              alt="Curated with love" 
              width={60} 
              height={60} 
            />
          </div>
          <h3 className={styles.statTitle}>Curated with love</h3>
          <p className={styles.statDescription}>
            Expert-guided trips with meticulous planning.
          </p>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Image 
              src="/images/icons/support.svg" 
              alt="24/7 Support" 
              width={60} 
              height={60} 
            />
          </div>
          <h3 className={styles.statTitle}>24*7 Support</h3>
          <p className={styles.statDescription}>
            We are always there to help you pre, post and on the trip.
          </p>
        </div>
      </div>
      {/* Policy Sections */}
      <div className={styles.policySection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => togglePolicy('confirmation')}
        >
          <h3 className={styles.sectionTitle}>Confirmation Policy</h3>
          <div className={styles.toggleIcon}>
            {isPolicyExpanded('confirmation') ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isPolicyExpanded('confirmation') && (
          <div className={styles.policyContent}>
            <ul className={styles.policyList}>
              <li>Your booking will be confirmed once we receive your full payment.</li>
              <li>Upon successful payment, you will receive an email confirmation with your voucher.</li>
              <li>The voucher will contain contact details of the local destination expert and emergency helpline numbers.</li>
              <li>In case of special requests or requirements, please mention them at the time of booking for us to accommodate them accordingly.</li>
            </ul>
          </div>
        )}
      </div>

      <div className={styles.policySection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => togglePolicy('refund')}
        >
          <h3 className={styles.sectionTitle}>Refund Policy</h3>
          <div className={styles.toggleIcon}>
            {isPolicyExpanded('refund') ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isPolicyExpanded('refund') && (
          <div className={styles.policyContent}>
            <ul className={styles.policyList}>
              <li>Refund amount depends on the cancellation policy and when the cancellation is made.</li>
              <li>Refunds will be processed within 7-14 working days after approval.</li>
              <li>Refunds will be made to the original payment method used for booking.</li>
              <li>No refunds will be processed for no-shows or unused services unless specified in the cancellation policy.</li>
              <li>Any bank charges or transaction fees during refund processing will be borne by the customer.</li>
            </ul>
          </div>
        )}
      </div>

      <div className={styles.policySection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => togglePolicy('cancellation')}
        >
          <h3 className={styles.sectionTitle}>Cancellation Policy</h3>
          <div className={styles.toggleIcon}>
            {isPolicyExpanded('cancellation') ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isPolicyExpanded('cancellation') && (
          <div className={styles.policyContent}>
            <ul className={styles.policyList}>
              <li>If cancellation is made 30 days or more before the date of travel, 25.0% of total booking cost will be charged as cancellation fees.</li>
              <li>If cancellation is made between 15 days to 30 days before the date of travel, 50.0% of total booking cost will be charged as cancellation fees.</li>
              <li>If cancellation is made within 15 days before the date of travel, total booking cost will be charged as cancellation fees.</li>
              <li>In the event of unforeseen weather conditions, union issues, government restrictions, or any other circumstances beyond human control, certain trips or activities may be cancelled. In such cases, alternate feasible options will be provided. However, a cash refund will not be available.</li>
            </ul>
          </div>
        )}
      </div>

      <div className={styles.policySection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => togglePolicy('payment')}
        >
          <h3 className={styles.sectionTitle}>Payment Term Policy</h3>
          <div className={styles.toggleIcon}>
            {isPolicyExpanded('payment') ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isPolicyExpanded('payment') && (
          <div className={styles.policyContent}>
            <ul className={styles.policyList}>
              <li>Full payment is required to confirm your booking.</li>
              <li>We accept payments via credit/debit cards, net banking, UPI, and other digital payment methods.</li>
              <li>International payments can be made via credit card or bank transfer.</li>
              <li>For group bookings of 10 or more people, special payment terms may be available upon request.</li>
              <li>All prices are inclusive of taxes unless otherwise stated.</li>
              <li>In case of any payment-related issues, our customer service team is available 24/7 to assist you.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourBookingInfo; 