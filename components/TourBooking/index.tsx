import React, { useState } from 'react';
import Link from 'next/link';
import { CalendarIcon, PersonIcon } from '../Icons';
import { createSlug } from '../../utils/slug';
import TourItinerary from '../TourItinerary';
import styles from './TourBooking.module.scss';
import TourPackageDetails from '../TourPackageDetails';
import TourReviews from '../TourReviews';
import SectionHeading from '../SectionHeading';
import TourBookingInfo from './TourBookingInfo';
import Icon3D, { Icon3DName } from '../Icon3D';
import { useCurrency } from '../../context/CurrencyContext';
import { TourActivity, TourFlight, TourStay, TourSummary, TourTransfer } from '../../types/staticData';

export interface PackageOption {
  days: number;
  price: number;
  image: string;
}

export interface TourBookingProps {
  title: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  savings?: number;
  duration: string;
  packageOptions?: PackageOption[];
  highlights?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];
  bannerImages?: {
    src: string;
    alt: string;
  }[];
  location: string;
  includedServices?: {
    icon: string;
    label: string;
  }[];
  className?: string;
  summary?: TourSummary;
  activities?: TourActivity[];
  stay?: TourStay[];
  flights?: TourFlight[];
  transfers?: TourTransfer[];
  inclusions?: string[];
  exclusions?: string[];
}

  // Tour reviews data
  const reviewsData = {
  overallRating: 4.8,
  totalReviews: 46700,
  countriesCount: 65,
  ratings: [
    { stars: 5, count: 36700 },
    { stars: 4, count: 8200 },
    { stars: 3, count: 1400 },
    { stars: 2, count: 78 },
    { stars: 1, count: 91 }
  ],
  travelerPhotos: [
    { 
      src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      alt: 'Sheikh Zayed Grand Mosque' 
    },
    { 
      src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  
      alt: 'Skydiving in Dubai' 
    },
    { 
      src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      alt: 'Dubai Desert Safari' 
    },
    { 
      src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      alt: 'Skydiving over Palm Jumeirah' 
    },
    { 
      src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      alt: 'Ferrari World Abu Dhabi' 
    }
      ,{ 
        src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        alt: 'Ferrari World Abu Dhabi' 
      },{ 
        src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        alt: 'Ferrari World Abu Dhabi' 
      },{ 
        src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        alt: 'Ferrari World Abu Dhabi' 
      },{ 
        src: 'https://plus.unsplash.com/premium_photo-1661964298224-7747aa0ac10c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        alt: 'Ferrari World Abu Dhabi' 
      }
  ],
  reviews: [
    {
      id: 1,
      name: 'Vinaya Arasu',
      profileImage: 'https://images.unsplash.com/photo-1628859017536-c2f1d69f3c84?q=80&w=2137&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: '04 Oct 2023',
      rating: 5.0,
      tourBooked: 'Wonders of Dubai | Journey through Jewels of the Emirates',
      tourLink: '#',
      comment: 'A mesmerizing trip to dubai was very well organized by the thrillophilia team. Our heartfelt thanks to Destination Expert Chirayu Sharma and yash for their continous support for our memorable trip. Itenerary was well planned and executed by the team. I would surely recommend thrillophilia to all my...',
      photos: [
        { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Dubai at night' },
        { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Dhow Cruise' },
          { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Desert Safari' },
          { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Dubai Fountain' },
          { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Burj Khalifa' },
          { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Dubai Mall' },
          { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Dubai Aquarium' },
          { src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Dubai Garden' },
         
      ]
    }
  ]
};

const TourBooking: React.FC<TourBookingProps> = ({
  title,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  savings = 0,
  duration,
  packageOptions = [],
  highlights = [],
  itinerary = [],
  bannerImages = [],
  location,
  includedServices = [],
  className,
  summary,
  activities = [],
  stay = [],
  flights = [],
  transfers = [],
  inclusions = [],
  exclusions = []
}) => {
  const { convertPrice, formatPrice, selectedCurrency } = useCurrency();
  const [countryCode, setCountryCode] = useState('+91');
  const [activeTab, setActiveTab] = useState('Itinerary');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    travelerCount: 1,
    message: ''
  });
  
  const durationDays = parseInt(duration.split(' ')[0], 10);
  
  // Convert prices using context methods
  const convertedOriginalPrice = convertPrice(originalPrice);
  const convertedDiscountedPrice = convertPrice(discountedPrice);
  const convertedSavings = convertPrice(savings);

  // Transform string inclusions and exclusions to the required format for TourPackageDetails
  const formattedInclusions = inclusions && inclusions.length > 0
    ? inclusions.map(item => ({ text: item }))
    : [];

  const formattedExclusions = exclusions && exclusions.length > 0
    ? exclusions.map(item => ({ text: item }))
    : [];
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', {
      ...formData,
      countryCode,
      tourTitle: title,
      tourLocation: location,
      tourDuration: duration,
      price: discountedPrice
    });
    // Here you would typically send this data to an API
  };

  // Default included services if none provided
  const defaultServices = [
    { icon: 'airplane', label: 'Flights included' },
    { icon: 'building', label: 'Stay included' },
    { icon: 'check', label: 'Breakfast included' },
    { icon: 'camera', label: 'Sightseeing included' },
  ];

  const servicesToShow = includedServices.length > 0 ? includedServices : defaultServices;
  
  return (
    <div className={`${styles.tourBookingContainer} ${className || ''}`}>
      <div className={styles.bookingLayout}>
      <div className={styles.bookingDetails}>
        <SectionHeading
          as="h1"
          size="section"
          eyebrow={location || 'Holiday'}
          icon="umbrella"
          title={title}
          accent={false}
          description={`${duration} in ${location}.`}
          className={styles.pageHeading}
        />
        
        <div className={styles.metaRow}>
          <span className={styles.metaChip}>
            <Icon3D name="calendar" alt="" size={24} />
            {duration}
          </span>
          <span className={styles.metaChip}>
            <Icon3D name="map" alt="" size={24} />
            {location}
          </span>
          <span className={styles.metaChip}>
            <Icon3D name="glowStar" alt="" size={24} />
            {rating.toFixed(1)}
            <span className={styles.reviewCount}>
              ({reviews.toLocaleString('en-US')} reviews)
            </span>
          </span>
        </div>
        
        <div className={styles.priceSection}>
          <div className={styles.currentPrice}>
            <span className={styles.currencyCode}>{selectedCurrency.code}</span>
            <span className={styles.priceValue}>{formatPrice(convertedDiscountedPrice).replace(`${selectedCurrency.code} `, '')}</span>
            <span className={styles.perPerson}>per adult</span>
          </div>
          <div className={styles.originalPrice}>
            {formatPrice(convertedOriginalPrice)}
          </div>
        </div>
        
        <div className={styles.includedServices}>
          {servicesToShow.map((service, index) => (
            <div key={index} className={styles.service}>
              <span className={styles.serviceIcon}>
                <Icon3D name={service.icon as Icon3DName} alt="" size={28} />
              </span>
              <span>{service.label}</span>
            </div>
          ))}
        </div>
        
        <TourItinerary 
          highlights={highlights}
          itinerary={itinerary}
          bannerImages={bannerImages}
          location={location}
          duration={durationDays}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          summary={summary}
          activities={activities}
          stay={stay}
          flights={flights}
          transfers={transfers}
        />
        
       
      </div>
      
      <aside className={styles.bookingForm}>
        <div className={styles.formPackageInfo}>
          <p className={styles.formEyebrow}>Plan this trip</p>
          <h3>{duration} in {location}</h3>
          <div className={styles.formPrice}>
            <div className={styles.formDiscountedPrice}>{formatPrice(convertedDiscountedPrice)}</div>
            <div className={styles.formOriginalPrice}>{formatPrice(convertedOriginalPrice)}</div>
            {savings > 0 && (
              <div className={styles.formSavings}>Save {formatPrice(convertedSavings)}</div>
            )}
          </div>
        </div>
        
        <form id="tour-enquiry" className={styles.formFields} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <input 
              type="text" 
              id="fullName" 
              placeholder="Full Name*" 
              className={styles.formInput}
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.formField}>
            <input 
              type="email" 
              id="email" 
              placeholder="Email*" 
              className={styles.formInput} 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className={styles.phoneField}>
            <select
              className={styles.countryCode}
              aria-label="Country code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
              <option value="+971">+971</option>
            </select>
            <input
              type="tel"
              id="phone"
              aria-label="Phone"
              placeholder="Your Phone*"
              className={styles.formInput}
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.dateCountFields}>
            <div className={styles.formDateField}>
              <input
                type="date"
                id="travelDate"
                aria-label="Travel date"
                className={styles.formInput}
                value={formData.travelDate}
                onChange={handleInputChange}
                required
              />
              <CalendarIcon size={18} className={styles.fieldIcon} />
            </div>
            <div className={styles.formCountField}>
              <PersonIcon size={18} className={styles.fieldIcon} />
              <input
                type="number"
                id="travelerCount"
                aria-label="Travellers"
                className={styles.formInput}
                min="1"
                value={formData.travelerCount}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formField}>
            <textarea 
              id="message" 
              placeholder="Message..." 
              className={styles.formTextarea}
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <button type="submit" className={styles.enquiryButton}>
            Request this {location} package
          </button>
          <p className={styles.formNote}>No payment now. Our team confirms dates and availability.</p>
          <Link
            href={`/customize?package=${createSlug(title)}&source=package-detail`}
            className={styles.customizeLink}
          >
            Customize this package
          </Link>
        </form>
      </aside>
      </div>
      <TourPackageDetails
        title="Inside this holiday"
        inclusions={formattedInclusions}
        exclusions={formattedExclusions}
      />
      <TourReviews
        overallRating={rating}
        totalReviews={reviews}
        countriesCount={reviewsData.countriesCount}
        ratings={reviewsData.ratings}
        travelerPhotos={reviewsData.travelerPhotos}
        reviews={reviewsData.reviews}
      />
      <TourBookingInfo />
    </div>
  );
};

export default TourBooking; 