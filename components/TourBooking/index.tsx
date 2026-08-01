import React, { useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import TourItinerary from '../TourItinerary';
import styles from './TourBooking.module.scss';
import TourPackageDetails from '../TourPackageDetails';
import TourReviews from '../TourReviews';
import TourBookingInfo from './TourBookingInfo';
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
  onCategoryChange?: (category: string) => void;
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
  onCategoryChange,
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
  const [selectedStay, setSelectedStay] = useState('Standard');
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
  
  // Handle stay category change
  const handleCategoryChange = (category: string) => {
    setSelectedStay(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

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
      selectedStay,
      tourTitle: title,
      tourLocation: location,
      tourDuration: duration,
      price: discountedPrice
    });
    // Here you would typically send this data to an API
  };

  // Default included services if none provided
  const defaultServices = [
    {
      icon: "/icons/transfer.svg",
      label: "Transfer Included"
    },
    {
      icon: "/icons/hotel.svg",
      label: "Stay Included"
    },
    {
      icon: "/icons/breakfast.svg",
      label: "Breakfast Included"
    },
    {
      icon: "/icons/sightseeing.svg",
      label: "Sightseeing Included"
    }
  ];

  const servicesToShow = includedServices.length > 0 ? includedServices : defaultServices;
  
  return (
    <div className={`${styles.tourBookingContainer} ${className || ''}`}>
      <div className={styles.bookingDetails}>
        <h1 className={styles.title}>{title}</h1>
        
        <div className={styles.durationBadge}>
          <div className={styles.daysNights}>{duration}</div>
          <div className={styles.location}>{location}</div>
        </div>
        
        <div className={styles.priceSection}>
          <div className={styles.priceDetails}>
            <div className={styles.starRating}>
              <span className={styles.ratingValue}>{rating}</span>
              <span className={styles.reviewCount}>({reviews}K)</span>
            </div>
            <div className={styles.priceInfo}>
              <div className={styles.currentPrice}>
                <span className={styles.currencyCode}>{selectedCurrency.code}</span>
                <span className={styles.priceValue}>{formatPrice(convertedDiscountedPrice).replace(`${selectedCurrency.code} `, '')}</span>
                <span className={styles.perPerson}>Per Adult</span>
              </div>
              <div className={styles.originalPrice}>
                {formatPrice(convertedOriginalPrice)}
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.includedServices}>
          {servicesToShow.map((service, index) => (
            <div key={index} className={styles.service}>
              <div className={styles.serviceIcon}>
                <Image src={service.icon} alt={service.label} width={24} height={24} />
              </div>
              <span>{service.label}</span>
            </div>
          ))}
        </div>
        
        <div className={styles.stayCategory}>
          <h3>Stay Category</h3>
          <div className={styles.categoryOptions}>
            <button 
              className={`${styles.categoryButton} ${selectedStay === 'Standard' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('Standard')}
            >
              {selectedStay === 'Standard' && <FaCheck className={styles.checkIcon} />}
              Standard
            </button>
            <button 
              className={`${styles.categoryButton} ${selectedStay === 'Deluxe' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('Deluxe')}
            >
              {selectedStay === 'Deluxe' && <FaCheck className={styles.checkIcon} />}
              Deluxe
            </button>
            <button 
              className={`${styles.categoryButton} ${selectedStay === 'Luxury' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('Luxury')}
            >
              {selectedStay === 'Luxury' && <FaCheck className={styles.checkIcon} />}
              Luxury
            </button>
          </div>
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
      
      <div className={styles.bookingForm}>
        <div className={styles.formPackageInfo}>
          <h3>{title} | {duration} in {location}</h3>
          <div className={styles.formPrice}>
            <div className={styles.formDiscountedPrice}>{formatPrice(convertedDiscountedPrice)}</div>
            <div className={styles.formOriginalPrice}>{formatPrice(convertedOriginalPrice)}</div>
            {savings > 0 && (
              <div className={styles.formSavings}>SAVE {formatPrice(convertedSavings)}</div>
            )}
          </div>
        </div>
        
        <form className={styles.formFields} onSubmit={handleSubmit}>
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
            <div className={styles.countryCode}>
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
                <option value="+971">+971</option>
              </select>
            </div>
            <input 
              type="tel" 
              id="phone" 
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
                placeholder="Travel Date*" 
                className={styles.formInput} 
                value={formData.travelDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formCountField}>
              <input 
                type="number" 
                id="travelerCount" 
                placeholder="Traveller Count*" 
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
            Book {location} Tour
          </button>
        </form>
      </div>
      <TourPackageDetails
        inclusions={formattedInclusions}
        exclusions={formattedExclusions}
      />
      <TourReviews
        overallRating={reviewsData.overallRating}
        totalReviews={reviewsData.totalReviews}
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