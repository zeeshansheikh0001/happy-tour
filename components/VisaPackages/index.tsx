import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPassport, FaClock, FaCheck, FaTimes, FaSmile } from 'react-icons/fa';
import { MdVerifiedUser, MdSupportAgent, MdSecurity } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaPlane } from 'react-icons/fa';
import { useCurrency } from '../../context/CurrencyContext';
import styles from './VisaPackages.module.scss';

interface PackageFeature {
  id: number;
  text: string;
  included: boolean;
}

interface VisaPackage {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  price: number;
  processingTime: string;
  popular?: boolean;
  features: PackageFeature[];
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

const visaPackages: VisaPackageType[] = [
  {
    id: 'standard',
    title: 'Standard Visa',
    description: 'Basic visa processing for budget travelers',
    price: 6000, // Price in INR
    processingTime: '7-10 business days',
    features: [
      'Visa application processing',
      'Document check',
      'Standard processing time',
      'Email support',
    ],
  },
  {
    id: 'express',
    title: 'Express Visa',
    description: 'Faster processing for time-sensitive travelers',
    price: 12000, // Price in INR
    processingTime: '3-5 business days',
    features: [
      'Expedited visa processing',
      'Document check & verification',
      'Priority handling',
      'Email & phone support',
      'Application progress tracking',
    ],
    popular: true,
  },
  {
    id: 'premium',
    title: 'Premium Visa',
    description: 'VIP service with maximum convenience',
    price: 20000, // Price in INR
    processingTime: '1-2 business days',
    features: [
      'Rush visa processing',
      'Document check, verification & preparation',
      'Dedicated visa consultant',
      '24/7 priority support',
      'Application progress tracking',
      'Additional document assistance',
      'Express courier service',
    ],
  },
];

interface VisaPackagesProps {
  onSelectPackage?: (packageData: VisaPackageType) => void;
}

const VisaPackages: React.FC<VisaPackagesProps> = ({ onSelectPackage }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const { convertPrice, formatPrice } = useCurrency();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const handleSelectPackage = (pkg: VisaPackageType) => {
    setSelectedPackage(pkg.id);
    
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
    
    // Scroll to checkout section if needed
    setTimeout(() => {
      if (checkoutRef.current) {
        checkoutRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  return (
    <section className={styles.visaPackages}>
      <div className={styles.sectionHeader}>
        <h2>Choose Your Visa Package</h2>
        <p>Select the visa service that best fits your travel needs and timeline</p>
      </div>

      <div className={styles.packagesContainer}>
        {visaPackages.map((pkg) => (
          <motion.div
            key={pkg.id}
            className={`${styles.packageCard} ${pkg.popular ? styles.popularPackage : ''} ${selectedPackage === pkg.id ? styles.selectedPackage : ''}`}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {pkg.popular && <div className={styles.popularBadge}>Most Popular</div>}
            <h3>{pkg.title}</h3>
            <p className={styles.packageDescription}>{pkg.description}</p>
            
            <div className={styles.packagePrice}>
              <span className={styles.amount}>{formatPrice(convertPrice(pkg.price))}</span>
            </div>
            
            <div className={styles.processingTime}>
              <FaClock className={styles.timeIcon} />
              <span>{pkg.processingTime}</span>
            </div>
            
            <ul className={styles.featuresList}>
              {pkg.features.map((feature, index) => (
                <li key={index}>
                  <BsCheckCircleFill className={styles.checkIcon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={styles.selectButton}
              onClick={() => handleSelectPackage(pkg)}
            >
              Select Package
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className={styles.additionalInfo}>
        <div className={styles.infoCard}>
          <FaPassport className={styles.infoIcon} />
          <div>
            <h4>Visa Type Flexibility</h4>
            <p>Our packages can be applied to tourist, business, or transit visas for most countries</p>
          </div>
        </div>
        
        <div className={styles.infoCard}>
          <FaPlane className={styles.infoIcon} />
          <div>
            <h4>Travel Ready</h4>
            <p>All successful applications include electronic visa copies sent directly to your email</p>
          </div>
        </div>
      </div>
      
      <div className={styles.disclaimer}>
        <p>
          <strong>Note:</strong> Visa fees are separate from application service fees. Government visa fees vary by country and visa type and will be charged separately.
          Approval is subject to immigration authorities' discretion.
        </p>
      </div>
    </section>
  );
};

export default VisaPackages; 