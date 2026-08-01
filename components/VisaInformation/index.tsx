import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPassport, FaRegListAlt, FaQuestionCircle, FaInfoCircle, FaFileAlt } from 'react-icons/fa';
import styles from './VisaInformation.module.scss';

type TabType = 'requirements' | 'process' | 'documents' | 'faq' | 'countries';

const VisaInformation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('requirements');

  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: -5, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'requirements':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className={styles.tabContent}
          >
            <h3>Visa Requirements</h3>
            <p>
              Before applying for a visa, ensure you meet the following general requirements:
            </p>
            <ul>
              <li>Valid passport with at least 6 months validity beyond your intended stay</li>
              <li>Completed visa application form with accurate information</li>
              <li>Passport-sized photographs meeting specific country requirements</li>
              <li>Proof of travel itinerary including flight and accommodation bookings</li>
              <li>Proof of sufficient financial means for your stay</li>
              <li>Travel insurance covering medical emergencies (recommended)</li>
              <li>Clean travel history and no criminal record</li>
            </ul>
            <p>
              <strong>Note:</strong> Requirements vary by destination country and visa type. Our consultants will guide you through the specific requirements for your situation.
            </p>
          </motion.div>
        );
      case 'process':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className={styles.tabContent}
          >
            <h3>Visa Application Process</h3>
            <div className={styles.processSteps}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <h4>Consultation</h4>
                <p>Schedule a consultation with our visa experts to determine the right visa type and package for your needs.</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <h4>Document Collection</h4>
                <p>Gather all required documents according to our comprehensive checklist.</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <h4>Application Preparation</h4>
                <p>Our team reviews and prepares your application, ensuring all forms are completed accurately.</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>4</span>
                <h4>Submission</h4>
                <p>We submit your application to the appropriate embassy or consulate and track its progress.</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>5</span>
                <h4>Processing</h4>
                <p>Wait for the processing period, which varies based on your selected package and destination country.</p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>6</span>
                <h4>Visa Collection</h4>
                <p>Receive your visa and travel documents, along with any necessary instructions for your trip.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'documents':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className={styles.tabContent}
          >
            <h3>Required Documents</h3>
            <p>
              The following documents are typically required for most visa applications:
            </p>
            <div className={styles.documentList}>
              <div className={styles.document}>
                <FaPassport className={styles.documentIcon} />
                <div>
                  <h4>Valid Passport</h4>
                  <p>Original passport valid for at least 6 months beyond your planned stay with at least 2-4 blank pages.</p>
                </div>
              </div>
              <div className={styles.document}>
                <FaFileAlt className={styles.documentIcon} />
                <div>
                  <h4>Visa Application Form</h4>
                  <p>Completed and signed visa application form specific to the destination country.</p>
                </div>
              </div>
              <div className={styles.document}>
                <FaRegListAlt className={styles.documentIcon} />
                <div>
                  <h4>Travel Itinerary</h4>
                  <p>Flight reservations, hotel bookings, and detailed travel plans for your visit.</p>
                </div>
              </div>
              <div className={styles.document}>
                <FaInfoCircle className={styles.documentIcon} />
                <div>
                  <h4>Proof of Financial Means</h4>
                  <p>Bank statements for the last 3-6 months showing sufficient funds for your trip.</p>
                </div>
              </div>
              <div className={styles.document}>
                <FaFileAlt className={styles.documentIcon} />
                <div>
                  <h4>Photographs</h4>
                  <p>Recent passport-sized photographs that meet the specific requirements of the embassy.</p>
                </div>
              </div>
              <div className={styles.document}>
                <FaFileAlt className={styles.documentIcon} />
                <div>
                  <h4>Supporting Documents</h4>
                  <p>Additional documents such as invitation letters, employment verification, or school enrollment certificates.</p>
                </div>
              </div>
            </div>
            <p className={styles.disclaimer}>
              <strong>Note:</strong> Document requirements vary by country and visa type. Our visa experts will provide you with a customized checklist based on your specific situation.
            </p>
          </motion.div>
        );
      case 'faq':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className={styles.tabContent}
          >
            <h3>Visa FAQs</h3>
            <div className={styles.faqSection}>
              <div className={styles.faqItem}>
                <h4>How far in advance should I apply for a visa?</h4>
                <p>We recommend applying at least 4-8 weeks before your planned travel date. Some countries have longer processing times, especially during peak travel seasons.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Can I expedite my visa application?</h4>
                <p>Yes, our Premium and VIP packages offer expedited processing for urgent travel needs. Expedited services are subject to availability and embassy regulations.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>What if I need to cancel my trip after getting a visa?</h4>
                <p>Most visas cannot be refunded once issued. Some countries allow for visa transfers or extensions, but this varies by destination.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Do you handle complex visa cases?</h4>
                <p>Yes, our visa experts specialize in handling complex cases, including previous visa rejections, special circumstances, and unique travel requirements.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Can I track my visa application status?</h4>
                <p>Yes, all our packages include application tracking. You'll receive regular updates about your visa status throughout the process.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'countries':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className={styles.tabContent}
          >
            <h3>Popular Visa Destinations</h3>
            <p>We offer visa services for numerous countries worldwide, including:</p>
            <div className={styles.countriesGrid}>
              <div className={styles.country}>
                <h4>United States</h4>
                <p>Tourist, Business, Student, and Work visas</p>
              </div>
              <div className={styles.country}>
                <h4>Schengen Countries</h4>
                <p>Short-stay, Long-stay, and Transit visas</p>
              </div>
              <div className={styles.country}>
                <h4>United Kingdom</h4>
                <p>Visitor, Student, and Business visas</p>
              </div>
              <div className={styles.country}>
                <h4>Canada</h4>
                <p>Tourist, Study, and Work permits</p>
              </div>
              <div className={styles.country}>
                <h4>Australia</h4>
                <p>Visitor, Student, and Working Holiday visas</p>
              </div>
              <div className={styles.country}>
                <h4>United Arab Emirates</h4>
                <p>Tourist, Business, and Transit visas</p>
              </div>
              <div className={styles.country}>
                <h4>China</h4>
                <p>Tourist, Business, and Work visas</p>
              </div>
              <div className={styles.country}>
                <h4>Japan</h4>
                <p>Tourist, Business, and Student visas</p>
              </div>
              <div className={styles.country}>
                <h4>Singapore</h4>
                <p>Tourist, Business, and Work visas</p>
              </div>
            </div>
            <p className={styles.supportText}>Don't see your destination? We handle visa applications for over 190 countries worldwide. Contact our team for specific information.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.visaInformation}>
      <div className={styles.tabsContainer}>
        <motion.button
          className={`${styles.tab} ${activeTab === 'requirements' ? styles.activeTab : ''}`}
          variants={tabVariants}
          animate={activeTab === 'requirements' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('requirements')}
        >
          <FaPassport />
          <span>Requirements</span>
        </motion.button>
        <motion.button
          className={`${styles.tab} ${activeTab === 'process' ? styles.activeTab : ''}`}
          variants={tabVariants}
          animate={activeTab === 'process' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('process')}
        >
          <FaRegListAlt />
          <span>Process</span>
        </motion.button>
        <motion.button
          className={`${styles.tab} ${activeTab === 'documents' ? styles.activeTab : ''}`}
          variants={tabVariants}
          animate={activeTab === 'documents' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('documents')}
        >
          <FaFileAlt />
          <span>Documents</span>
        </motion.button>
        <motion.button
          className={`${styles.tab} ${activeTab === 'faq' ? styles.activeTab : ''}`}
          variants={tabVariants}
          animate={activeTab === 'faq' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('faq')}
        >
          <FaQuestionCircle />
          <span>FAQs</span>
        </motion.button>
        <motion.button
          className={`${styles.tab} ${activeTab === 'countries' ? styles.activeTab : ''}`}
          variants={tabVariants}
          animate={activeTab === 'countries' ? 'active' : 'inactive'}
          onClick={() => setActiveTab('countries')}
        >
          <FaInfoCircle />
          <span>Countries</span>
        </motion.button>
      </div>
      <div className={styles.contentContainer}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default VisaInformation; 