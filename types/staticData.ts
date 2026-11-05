export interface NavItem {
  name: string;
  id: string;
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

export const UAE_EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ras Al Khaimah',
  'Fujairah',
  'Ajman',
  'Umm Al Quwain',
] as const;

export type UaeEmirate = (typeof UAE_EMIRATES)[number];

export const UAE_ACTIVITY_CATEGORIES = [
  { id: 'sightseeing', label: 'Sightseeing & City Tours' },
  { id: 'desert', label: 'Desert Safaris & Adventures' },
  { id: 'water-sports', label: 'Water Sports' },
  { id: 'yacht-cruise', label: 'Yacht & Cruise Experiences' },
  { id: 'mountain', label: 'Mountain & Outdoor Adventures' },
  { id: 'theme-parks', label: 'Theme Parks & Water Parks' },
  { id: 'extreme', label: 'Extreme Adventures' },
  { id: 'diving', label: 'Diving & Marine Experiences' },
  { id: 'culture', label: 'Culture & Heritage' },
  { id: 'nature', label: 'Nature & Wildlife' },
  { id: 'beaches', label: 'Beaches & Relaxation' },
  { id: 'aerial', label: 'Aerial Experiences' },
  { id: 'food', label: 'Food & Dining Experiences' },
  { id: 'family', label: 'Kids & Family Activities' },
] as const;

export type UaeActivityCategory = (typeof UAE_ACTIVITY_CATEGORIES)[number]['id'];
export type UaeBudget = 'free' | 'budget' | 'mid-range' | 'luxury';
export type UaeDuration = 'under-2-hours' | 'half-day' | 'full-day' | 'multi-day';
export type UaeTraveler = 'solo' | 'couple' | 'family' | 'group';
export type UaeLevel = 'easy' | 'moderate' | 'extreme';
export type UaeEnvironment = 'indoor' | 'outdoor';

export interface UaeActivity {
  id: string;
  title: string;
  emirate: UaeEmirate;
  area?: string;
  category: UaeActivityCategory;
  budget: UaeBudget;
  duration: UaeDuration;
  travelers: UaeTraveler[];
  level: UaeLevel;
  environment: UaeEnvironment;
  seasonal: boolean;
  note?: string;
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
  place: string;
  website: string;
}

export interface TouristFeedback {
  id: number;
  name: string;
  location: string;
  quote: string;
  avatar: string;
  avatarBg: string;
  destinationId?: string;
  trip?: string;
}

export interface DestinationPageCopy {
  id: string;
  name: string;
  heading: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  visaHelp: boolean;
}

export interface DestinationFact {
  label: string;
  value: string;
}

export interface DestinationHighlight {
  title: string;
  text: string;
  icon: string;
}

export interface DestinationGuide {
  id: string;
  kicker: string;
  heading: string;
  intro: string;
  facts: DestinationFact[];
  highlights: DestinationHighlight[];
  notes: string[];
}

export interface HeroSlide {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster: string;
  title: string;
  subtitle: string;
  destinationId?: string;
  href?: string;
}

export interface TrustStat {
  id: string;
  label: string;
  value?: number;
  suffix?: string;
  prefix?: string;
  icon: 'person' | 'tickets' | 'map' | 'glowStar';
}

export interface TrustIndicator {
  id: string;
  label: string;
  icon: 'clipboard' | 'compass' | 'receiver';
}

export interface TrustSocialLink {
  id: 'linkedin' | 'instagram' | 'twitter' | 'facebook';
  label: string;
  href: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HolidayDestination {
  id: string;
  name: string;
  country: string;
  image: string;
}

export interface VisaDestination {
  id: string;
  name: string;
  country: string;
  image: string;
  note: string;
}

export interface VisaHeroSlide {
  id: string;
  name: string;
  country: string;
  image: string;
  destinationId: string;
  label: string;
}

export interface VisaHelpStep {
  id: string;
  title: string;
  text: string;
  icon: 'clipboard' | 'document' | 'check';
}

export interface VisaDocumentItem {
  id: string;
  title: string;
  text: string;
  icon: 'passport' | 'camera' | 'airplane' | 'building' | 'clipboard' | 'document';
} 