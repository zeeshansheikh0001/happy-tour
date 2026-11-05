import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../Icons';
import Icon3D from '../Icon3D';
import styles from './TourBookingInfo.module.scss';

const TourBookingInfo: React.FC = () => {
  const [expandedPolicies, setExpandedPolicies] = useState<string[]>(['cancellation']);

  const togglePolicy = (policy: string) => {
    setExpandedPolicies((prev) =>
      prev.includes(policy) ? prev.filter((item) => item !== policy) : [...prev, policy],
    );
  };

  const isPolicyExpanded = (policy: string) => expandedPolicies.includes(policy);

  return (
    <div className={styles.bookingInfoContainer}>
      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Icon3D name="clipboard" alt="" size={40} />
          </div>
          <h3 className={styles.statTitle}>Handpicked itineraries</h3>
          <p className={styles.statDescription}>
            Each day is planned around the destination, not a template.
          </p>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Icon3D name="compass" alt="" size={40} />
          </div>
          <h3 className={styles.statTitle}>Local expert planning</h3>
          <p className={styles.statDescription}>
            Stays, transfers, and activities coordinated on the ground.
          </p>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Icon3D name="glowStar" alt="" size={40} />
          </div>
          <h3 className={styles.statTitle}>Rated by travellers</h3>
          <p className={styles.statDescription}>
            Reviews come from the packages we actually list.
          </p>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Icon3D name="receiver" alt="" size={40} />
          </div>
          <h3 className={styles.statTitle}>Trip support on call</h3>
          <p className={styles.statDescription}>
            Help before departure, during the trip, and after you return.
          </p>
        </div>
      </div>

      <div className={styles.policySection}>
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => togglePolicy('confirmation')}
        >
          <h3 className={styles.sectionTitle}>Confirmation Policy</h3>
          <span className={styles.toggleIcon}>
            {isPolicyExpanded('confirmation') ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
        </button>
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
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => togglePolicy('refund')}
        >
          <h3 className={styles.sectionTitle}>Refund Policy</h3>
          <span className={styles.toggleIcon}>
            {isPolicyExpanded('refund') ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
          </span>
        </button>
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
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => togglePolicy('cancellation')}
        >
          <h3 className={styles.sectionTitle}>Cancellation Policy</h3>
          <span className={styles.toggleIcon}>
            {isPolicyExpanded('cancellation') ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
          </span>
        </button>
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
        <button
          type="button"
          className={styles.sectionHeader}
          onClick={() => togglePolicy('payment')}
        >
          <h3 className={styles.sectionTitle}>Payment Term Policy</h3>
          <span className={styles.toggleIcon}>
            {isPolicyExpanded('payment') ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
          </span>
        </button>
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
