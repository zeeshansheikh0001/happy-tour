import { ReactElement } from 'react';

export interface NavItem {
  name: string;
  id: string;
  icon: ReactElement;
  trending?: boolean;
}

export interface TourLocation {
  days: number;
  place: string;
}

export interface TourSummary {
  overview: string;
  keyHighlights: string[];
  usps: string[];
  targetAudience: string[];
}

export interface TourActivity {
  id: number;
  name: string;
  image: string;
  description: string;
  duration: string;
  included: boolean;
  price?: number;
  highlights?: string[];
}

export interface TourStay {
  id: number;
  hotelName: string;
  image: string;
  rating: number;
  description: string;
  location: string;
  amenities: string[];
  roomType?: string;
  checkInDate?: string;
  checkOutDate?: string;
  nights?: number;
}

export interface TourFlight {
  id: number;
  airline: string;
  airlineImage: string;
  flightNumber: string;
  departureTime: string;
  departureAirport: string;
  departureCode: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalCode: string;
  duration: string;
  date: string;
  isReturn: boolean;
}

export interface TourTransfer {
  id: number;
  type: string;
  description: string;
  date?: string;
  time?: string;
  included: boolean;
  additionalInfo?: string;
}

export interface TourReviewsData {
  overallRating: number;
  totalReviews: number;
  countriesCount: number;
  ratings: {
    stars: number;
    count: number;
  }[];
  travelerPhotos: {
    src: string;
    alt: string;
  }[];
  reviews: {
    id: number;
    name: string;
    profileImage: string;
    date: string;
    rating: number;
    tourBooked: string;
    tourLink?: string;
    comment: string;
    photos: {
      src: string;
      alt: string;
    }[];
  }[];
}

export interface TourPackage {
  id: number;
  images: string[];
  title: string;
  duration: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  locations: TourLocation[];
  mainImage?: {
    src: string;
    alt: string;
  };
  thumbnails?: {
    id: string;
    src: string;
    alt: string;
    label: string;
  }[];
  description?: string;
  packageOptions?: {
    days: number;
    price: number;
    image: string;
  }[];
  highlights?: string[];
  bannerImages?: {
    src: string;
    alt: string;
  }[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];
  summary?: TourSummary;
  activities?: TourActivity[];
  stay?: TourStay[];
  flights?: TourFlight[];
  transfers?: TourTransfer[];
  inclusions?: string[];
  exclusions?: string[];
  reviewsData?: TourReviewsData;
}

export interface Activity {
  id: number;
  image: string;
  title: string;
  duration: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  countryCode: string;
}

export interface TourismBoard {
  id: number;
  name: string;
  logo: string;
  website: string;
} 