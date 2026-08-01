import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPassport, FaPlane, FaCheckCircle, FaInfoCircle, FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import styles from './Visa.module.scss';
import VisaPackages from '../VisaPackages';
import { useCurrency } from '../../context/CurrencyContext';

interface VisaProps {
  countryName?: string;
}

type VisaPackageType = {
  id: string;
  title: string;
  description: string;
  price: number;
  processingTime: string;
  features: string[];
  popular?: boolean;
};

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  travelDate: string;
  visaType: string;
  message: string;
}

const Visa: React.FC<VisaProps> = ({ countryName = "Dubai" }) => {
  const [selectedTab, setSelectedTab] = useState<'requirements' | 'application' | 'fees' | 'packages'>('requirements');
  const [isVisible, setIsVisible] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<VisaPackageType | null>(null);
  const { convertPrice, formatPrice } = useCurrency();
  
  // For portal rendering
  const [isBrowser, setIsBrowser] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    travelDate: '',
    visaType: 'Tourist',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // For portal rendering
    setIsBrowser(true);
    
    // Animation delay for content visibility
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const requirementsList = [
    { id: 1, text: "Valid passport with at least 6 months validity", icon: <FaPassport /> },
    { id: 2, text: "Completed visa application form", icon: <FaCheckCircle /> },
    { id: 3, text: "Passport-sized photographs with white background", icon: <FaCheckCircle /> },
    { id: 4, text: "Flight booking confirmation", icon: <FaPlane /> },
    { id: 5, text: "Hotel reservation confirmation", icon: <FaCheckCircle /> },
    { id: 6, text: "Travel insurance covering the entire stay", icon: <FaCheckCircle /> }
  ];

  const applicationSteps = [
    { id: 1, title: "Fill Application", text: "Complete the online visa application form with personal details" },
    { id: 2, title: "Upload Documents", text: "Submit required documents including passport copy and photographs" },
    { id: 3, title: "Pay Fees", text: "Process payment for your visa application" },
    { id: 4, title: "Track Application", text: "Monitor your application status through our portal" },
    { id: 5, title: "Receive Visa", text: "Download your e-visa or receive physical visa as applicable" }
  ];

  const feeStructure = [
    { type: "Tourist Visa (30 days)", fee: 7500, processingTime: "3-5 working days" },
    { type: "Tourist Visa (90 days)", fee: 15000, processingTime: "3-5 working days" },
    { type: "Transit Visa (48 hours)", fee: 800, processingTime: "24 hours" },
    { type: "Transit Visa (96 hours)", fee: 2500, processingTime: "48 hours" },
    { type: "Express Processing", fee: 4000, processingTime: "24 hours" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const tabVariants = {
    inactive: { borderBottom: "2px solid transparent" },
    active: { borderBottom: "2px solid #FF7A00" }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 15 }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      transition: { duration: 0.2 }
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if value exists
    if (value.trim()) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    let isValid = true;
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }
    
    if (!formData.nationality.trim()) {
      errors.nationality = 'Nationality is required';
      isValid = false;
    }
    
    if (!formData.travelDate.trim()) {
      errors.travelDate = 'Travel date is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form data to backend
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('Your visa application has been submitted successfully! We will contact you shortly.');
      
      // Close the modal
      setShowApplicationForm(false);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        nationality: '',
        travelDate: '',
        visaType: 'Tourist',
        message: ''
      });
    }
  };
  
  const handlePackageSelect = (pkg: VisaPackageType) => {
    setSelectedPackage(pkg);
    setShowApplicationForm(true);
    setFormData(prev => ({ 
      ...prev, 
      visaType: pkg.title 
    }));
  };
  
  // Render the modal form using portal
  const renderFormModal = () => {
    if (!isBrowser || !showApplicationForm) return null;
    
    return createPortal(
      <div className={styles.modalOverlay}>
        <motion.div
          className={styles.modalContainer}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.modalHeader}>
            <h3>Visa Application Form</h3>
            <button
              className={styles.closeButton}
              onClick={() => setShowApplicationForm(false)}
            >
              <FaTimes />
            </button>
          </div>

          {selectedPackage && (
            <div className={styles.selectedPackageInfo}>
              <h4>Selected Package: {selectedPackage.title}</h4>
              <p>Price: {formatPrice(convertPrice(selectedPackage.price))}</p>
              <p>Processing Time: {selectedPackage.processingTime}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.applicationForm}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">
                <FaUser className={styles.inputIcon} />
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                placeholder="Enter your full name"
                className={formErrors.fullName ? styles.inputError : ''} />
              {formErrors.fullName && (
                <span className={styles.errorMessage}>{formErrors.fullName}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">
                <FaEnvelope className={styles.inputIcon} />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Enter your email"
                className={formErrors.email ? styles.inputError : ''} />
              {formErrors.email && (
                <span className={styles.errorMessage}>{formErrors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">
                <FaPhone className={styles.inputIcon} />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="Enter your phone number"
                className={formErrors.phone ? styles.inputError : ''} />
              {formErrors.phone && (
                <span className={styles.errorMessage}>{formErrors.phone}</span>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nationality">
                  Nationality *
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleFormChange}
                  placeholder="Enter your nationality"
                  className={formErrors.nationality ? styles.inputError : ''} />
                {formErrors.nationality && (
                  <span className={styles.errorMessage}>{formErrors.nationality}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="travelDate">
                  <FaCalendarAlt className={styles.inputIcon} />
                  Travel Date *
                </label>
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleFormChange}
                  className={formErrors.travelDate ? styles.inputError : ''} />
                {formErrors.travelDate && (
                  <span className={styles.errorMessage}>{formErrors.travelDate}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="visaType">
                Visa Type *
              </label>
              <select
                id="visaType"
                name="visaType"
                value={formData.visaType}
                onChange={handleFormChange}
              >
                <option value="Tourist">Tourist Visa</option>
                <option value="Business">Business Visa</option>
                <option value="Transit">Transit Visa</option>
                <option value="Work">Work Visa</option>
                <option value="Student">Student Visa</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Any specific requirements or questions?"
                rows={4} />
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowApplicationForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
              >
                Submit Application
              </button>
            </div>
          </form>
        </motion.div>
      </div>,
      document.body
    );
  };

  return (
    <>
    <VisaPackages onSelectPackage={handlePackageSelect} />
    <div className={styles.visaMainContainer}>
      <div className={styles.visaContainer}>
        <motion.div
          className={styles.visaHeader}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.visaIcon}>
            <FaPassport size={36} color="#FF7A00" />
          </div>
          <h2>{countryName} Visa Information</h2>
        </motion.div>

        <div className={styles.tabsContainer}>
          <motion.button
            className={`${styles.tabButton} ${selectedTab === 'requirements' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('requirements')}
            variants={tabVariants}
            animate={selectedTab === 'requirements' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Requirements
          </motion.button>

          <motion.button
            className={`${styles.tabButton} ${selectedTab === 'application' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('application')}
            variants={tabVariants}
            animate={selectedTab === 'application' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Application Process
          </motion.button>

          <motion.button
            className={`${styles.tabButton} ${selectedTab === 'fees' ? styles.activeTab : ''}`}
            onClick={() => setSelectedTab('fees')}
            variants={tabVariants}
            animate={selectedTab === 'fees' ? 'active' : 'inactive'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fees
          </motion.button>
        </div>

        <div className={styles.contentContainer}>
          {selectedTab === 'requirements' && (
            <motion.ul
              className={styles.requirementsList}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {requirementsList.map(item => (
                <motion.li key={item.id} className={styles.requirementItem} variants={itemVariants}>
                  <span className={styles.requirementIcon}>{item.icon}</span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {selectedTab === 'application' && (
            <motion.div
              className={styles.applicationSteps}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {applicationSteps.map((step, index) => (
                <motion.div key={step.id} className={styles.stepCard} variants={itemVariants}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepContent}>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'fees' && (
            <motion.div
              className={styles.feesTable}
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              <div className={styles.tableHeader}>
                <span>Visa Type</span>
                <span>Fee</span>
                <span>Processing Time</span>
              </div>
              {feeStructure.map((fee, index) => (
                <motion.div key={index} className={styles.tableRow} variants={itemVariants}>
                  <span>{fee.type}</span>
                  <span>{formatPrice(convertPrice(fee.fee))}</span>
                  <span>{fee.processingTime}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* {selectedTab === 'packages' && (
      <motion.div
        className={styles.packagesContainer}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <VisaPackages onSelectPackage={handlePackageSelect} />
      </motion.div>
    )} */}
        </div>

        <motion.div
          className={styles.visaFooter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className={styles.noticeBox}>
            <FaInfoCircle className={styles.infoIcon} />
            <p>Visa requirements may change. Please check the latest requirements before applying.</p>
          </div>
          <motion.button
            className={styles.applyButton}
            whileHover={{ scale: 1.05, backgroundColor: "#FF9A40" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowApplicationForm(true)}
          >
            Apply for Visa
          </motion.button>
        </motion.div>
      </div>

      {/* Render the form modal using portal */}
      {renderFormModal()}
    </div>
    </>
  );
};

export default Visa; 