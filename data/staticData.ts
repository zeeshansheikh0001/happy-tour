import {
  NavItem,
  TourPackage,
  Activity,
  Currency,
  TourismBoard,
  TouristFeedback,
  HeroSlide,
  VisaHeroSlide,
  TrustStat,
  TrustIndicator,
  TrustSocialLink,
  FaqItem,
  HolidayDestination,
  VisaDestination,
  VisaHelpStep,
  VisaDocumentItem,
  DestinationGuide,
} from '../types/staticData';

// Navigation items data
export const navigationItems: NavItem[] = [
  { name: 'Explore', id: 'explore' },
  { name: 'Dubai', id: 'dubai' },
  { name: 'Hanoi', id: 'vietnam' },
  { name: 'Ladakh', id: 'ladakh' },
  { name: 'Kashmir', id: 'kashmir' },
  { name: 'North East India', id: 'north-east-india' },
];

const hdImage = (url: string) => url.replace(/w=\d+/, 'w=2400').replace(/q=\d+/, 'q=85');

export const holidayDestinations: HolidayDestination[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: hdImage('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'),
  },
  {
    id: 'vietnam',
    name: 'Hanoi',
    country: 'Vietnam',
    image: hdImage('https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'),
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    country: 'India',
    image: hdImage('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'),
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    country: 'India',
    image: hdImage('https://images.unsplash.com/photo-1614056965546-42fbe24eb36c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'),
  },
  {
    id: 'north-east-india',
    name: 'North East India',
    country: 'India',
    image: hdImage('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'),
  },
];

const destinationImage = (id: string) =>
  holidayDestinations.find((item) => item.id === id)?.image ?? '';

export const heroSlides: HeroSlide[] = [
  {
    id: 'dubai-video',
    type: 'video',
    src: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Dubai_creek.webm',
    poster: destinationImage('dubai'),
    title: 'Dubai',
    subtitle: 'Creek sunsets, skylines, and desert nights',
    destinationId: 'dubai',
  },
  {
    id: 'dubai-image',
    type: 'image',
    src: destinationImage('dubai'),
    poster: destinationImage('dubai'),
    title: 'Flight-inclusive Dubai',
    subtitle: 'Stays, airport transfers, and a planned city break',
    destinationId: 'dubai',
  },
  {
    id: 'vietnam-video',
    type: 'video',
    src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/98/Ha_Long_cruise_20220731_180024568.webm/Ha_Long_cruise_20220731_180024568.webm.480p.vp9.webm',
    poster: destinationImage('vietnam'),
    title: 'Hanoi & Halong',
    subtitle: 'Cruise limestone bays and lantern-lit streets',
    destinationId: 'vietnam',
  },
  {
    id: 'vietnam-image',
    type: 'image',
    src: destinationImage('vietnam'),
    poster: destinationImage('vietnam'),
    title: 'Vietnam',
    subtitle: 'Handpicked stays across the north and coast',
    destinationId: 'vietnam',
  },
  {
    id: 'ladakh-image',
    type: 'image',
    src: destinationImage('ladakh'),
    poster: destinationImage('ladakh'),
    title: 'Ladakh',
    subtitle: 'High passes, monasteries, and open sky',
    destinationId: 'ladakh',
  },
  {
    id: 'kashmir-image',
    type: 'image',
    src: destinationImage('kashmir'),
    poster: destinationImage('kashmir'),
    title: 'Kashmir',
    subtitle: 'Dal Lake mornings and mountain stays',
    destinationId: 'kashmir',
  },
  {
    id: 'north-east-image',
    type: 'image',
    src: destinationImage('north-east-india'),
    poster: destinationImage('north-east-india'),
    title: 'North East India',
    subtitle: 'Valleys, tea gardens, and slow travel',
    destinationId: 'north-east-india',
  },
];

// Tours data
export const tours: TourPackage[] = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583997052301-0042b33fc598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1550077770-0962b9a962db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582672008243-2569804aec3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Escape To Dubai | Flights Inclusive Deal',
    duration: '5 days & 4 nights',
    rating: 5.0,
    reviews: 1200,
    originalPrice: 124761,
    discountedPrice: 68550,
    savings: 56211,
    locations: [
      { days: 5, place: 'Dubai' }
    ],
    mainImage: {
      src: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Jumeirah Mosque in Dubai'
    },
    thumbnails: [
      {
        id: '1',
        src: 'https://plus.unsplash.com/premium_photo-1733317416241-d92ba6af4e51?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Dubai skyline at night',
        label: 'Destination'
      },
      {
        id: '2',
        src: 'https://images.unsplash.com/photo-1744413723378-57a12d15a6d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXRsYW50aXMlMjBEdWJhaSUyMFBvb2x8ZW58MHx8MHx8fDA%3D',
        alt: 'Luxury hotel swimming pool',
        label: 'Stay'
      },
      {
        id: '3', 
        src: 'https://images.unsplash.com/photo-1643636179992-fb7ec5541076?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFRyYWRpdGlvbmFsJTIwRGhvdyUyMENydWlzZSUyMGluJTIwRHViYWklMjBDcmVla3xlbnwwfHwwfHx8MA%3D%3D',
        alt: 'Traditional Dhow Cruise in Dubai Creek',
        label: 'Activity & Sightseeing'
      },
      {
        id: '4',
        src: 'https://images.unsplash.com/photo-1628859017536-c2f1d69f3c84?q=80&w=2137&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Desert fort',
        label: 'Cultural Landmark'
      }
    ],
    description: 'Experience the best of Dubai with this all-inclusive package featuring luxury accommodations, guided tours, and exciting activities.',
    packageOptions: [
      {
        days: 3,
        price: 33309,
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
      },
      {
        days: 4,
        price: 37950,
        image: 'https://images.unsplash.com/photo-1582672008243-2569804aec3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
      },
      {
        days: 5,
        price: 68550,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
      },
      {
        days: 6,
        price: 40930,
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
      },
      {
        days: 7,
        price: 57999,
        image: 'https://images.unsplash.com/photo-1578072986786-5b8b7458156e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
      }
    ],
    highlights: [
      "Dive into a world of luxury, from pristine beaches to towering skyscrapers, from thrilling desert safaris to world-class shopping in Dubai.",
      "Get a surreal experience as you stand on the 125th floor of the world's tallest building, Burj Khalifa, offering views of Dubai's cityscape and shimmering coastline.",
      "Feel the adrenaline rush as you go for a dune-bashing adventure in Dubai's expansive desert, creating a thrilling experience amidst the golden landscape.",
      "Enjoy a magical journey aboard the traditional dhow cruise and glide along the serene waters of Dubai Creek with amazing views of the city's illuminated skyline."
    ],
    bannerImages: [
      {
        src: 'https://images.unsplash.com/photo-1583997052301-0042b33fc598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
        alt: 'Burj Khalifa, Dubai'
      },
      {
        src: 'https://images.unsplash.com/photo-1580674684075-b10ec6590Ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
        alt: 'Aerial view of Atlantis The Palm, Dubai'
      },
      {
        src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
        alt: 'Dubai Marina skyline'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Dubai',
        description: 'Arrive at Dubai International Airport. You will be met by our representative and transferred to your hotel. Check-in and relax for the rest of the day. Overnight stay at the hotel in Dubai.'
      },
      {
        day: 2,
        title: 'Marina Dhow Dinner Cruise Tour',
        description: 'After breakfast, the day is free for leisure. In the evening, enjoy a traditional Dhow Cruise with dinner along Dubai Marina, offering spectacular views of the illuminated skyline. Return to the hotel for overnight stay.'
      },
      {
        day: 3,
        title: 'Dubai City Tour & Burj Khalifa',
        description: 'After breakfast, proceed for a half-day Dubai city tour covering Jumeirah Mosque, Jumeirah Beach, Burj Al Arab (photo stop), Palm Jumeirah, and Dubai Mall. In the evening, experience the breathtaking views from the observation deck of Burj Khalifa, the tallest building in the world. Overnight stay at the hotel.'
      },
      {
        day: 4,
        title: 'Desert Safari with BBQ Dinner',
        description: 'Morning at leisure. In the afternoon, experience an exciting desert safari with dune bashing in a 4x4 vehicle. Enjoy a BBQ dinner with cultural performances including belly dancing and tanoura show under the starlit desert sky. Return to the hotel for overnight stay.'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'After breakfast, check-out from the hotel and transfer to Dubai International Airport for your departure flight, taking back wonderful memories of your trip.'
      }
    ],
    summary: {
      overview: "Experience the ultimate 5-day Dubai adventure blending luxury, culture, and adventure. This all-inclusive package lets you explore iconic landmarks like Burj Khalifa and Palm Jumeirah, enjoy thrilling activities including desert safaris and dhow cruises, and relax in premium accommodations with daily breakfast. Perfect for families, couples, and first-time visitors to Dubai looking for a hassle-free experience with the perfect balance of guided tours and leisure time.",
      keyHighlights: [
        "See all major Dubai attractions in one comprehensive tour",
        "Enjoy hassle-free transfers and guided experiences",
        "Experience luxury accommodations with daily breakfast",
        "Balanced itinerary with guided tours and free time"
      ],
      usps: [
        "All-inclusive package with flights, accommodations, and attractions",
        "Skip-the-line tickets to major attractions",
        "Professional English-speaking guides",
        "Customizable stay categories from Standard to Luxury"
      ],
      targetAudience: [
        "Families with children",
        "Couples and honeymooners",
        "First-time visitors to Dubai",
        "Travellers seeking a balanced city and adventure experience"
      ]
    },
    activities: [
      {
        id: 1,
        name: "Burj Khalifa At The Top Experience",
        image: "https://images.unsplash.com/photo-1582672008243-2569804aec3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Visit the world's tallest building and enjoy panoramic views of Dubai from the 124th and 125th floor observation decks.",
        duration: "1.5 hours",
        included: true,
        highlights: [
          "Skip-the-line tickets",
          "Multimedia presentations about Dubai's history",
          "360-degree panoramic views"
        ]
      },
      {
        id: 2,
        name: "Desert Safari with BBQ Dinner",
        image: "https://images.unsplash.com/photo-1580139906626-472142ceab5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Experience thrilling dune bashing, camel riding, and a traditional BBQ dinner under the stars with live entertainment.",
        duration: "6 hours",
        included: true,
        highlights: [
          "Dune bashing in 4x4 vehicles",
          "Camel rides and sand boarding",
          "BBQ dinner with vegetarian options",
          "Cultural performances including belly dancing"
        ]
      },
      {
        id: 3,
        name: "Dubai Marina Dhow Cruise Dinner",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Cruise along Dubai Marina on a traditional wooden dhow boat while enjoying a delicious dinner buffet.",
        duration: "2 hours",
        included: true,
        highlights: [
          "Welcome drinks on arrival",
          "International buffet dinner",
          "Stunning views of Dubai Marina skyline",
          "Live Tanura dance show"
        ]
      },
      {
        id: 4,
        name: "Old Dubai Cultural Tour",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        description: "Explore the historic Al Fahidi district, Dubai Museum, textiles and spice souks, with an abra ride on Dubai Creek.",
        duration: "4 hours",
        included: true,
        highlights: [
          "Visit to Dubai Museum in Al Fahidi Fort",
          "Traditional abra ride across Dubai Creek",
          "Guided walk through spice and gold souks",
          "Learn about Emirati history and culture"
        ]
      }
    ],
    stay: [
      {
        id: 1,
        hotelName: "Grand Hyatt Dubai",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=60",
        rating: 5,
        description: "Set within lush gardens, Grand Hyatt Dubai is an oasis in the city offering luxurious accommodations and excellent dining options.",
        location: "Sheikh Rashid Road, Dubai",
        amenities: ["Free WiFi", "Pool", "Spa", "Fitness Center", "Multiple Restaurants", "Room Service"],
        roomType: "Deluxe Room with Creek View",
        checkInDate: "2023-05-12",
        checkOutDate: "2023-05-16",
        nights: 4
      }
    ],
    flights: [
      {
        id: 1,
        airline: "Emirates Airlines",
        airlineImage: "https://placehold.co/80x40?text=Emirates",
        flightNumber: "EK507",
        departureTime: "09:45",
        departureAirport: "Delhi International Airport",
        departureCode: "DEL",
        arrivalTime: "12:15",
        arrivalAirport: "Dubai International Airport",
        arrivalCode: "DXB",
        duration: "3h 30m",
        date: "2023-05-12",
        isReturn: false
      },
      {
        id: 2,
        airline: "Emirates Airlines",
        airlineImage: "https://placehold.co/80x40?text=Emirates",
        flightNumber: "EK508",
        departureTime: "15:30",
        departureAirport: "Dubai International Airport",
        departureCode: "DXB",
        arrivalTime: "20:30",
        arrivalAirport: "Delhi International Airport",
        arrivalCode: "DEL",
        duration: "3h 30m",
        date: "2023-05-16",
        isReturn: true
      }
    ],
    transfers: [
      {
        id: 1,
        type: "Airport to Hotel",
        description: "A comfortable private car will be waiting for you at the airport upon arrival to take you directly to your hotel.",
        date: "2023-05-12",
        time: "12:45",
        included: true,
        additionalInfo: "Look for a driver holding a sign with your name at the arrivals area"
      },
      {
        id: 2,
        type: "Hotel to Airport",
        description: "A private transfer will pick you up from your hotel 3 hours before your departure flight.",
        date: "2023-05-16",
        time: "12:30",
        included: true,
        additionalInfo: "Vehicle type: Toyota Camry or similar"
      },
      {
        id: 3,
        type: "Desert Safari Pickup",
        description: "4x4 vehicle pickup from your hotel for the desert safari experience.",
        date: "2023-05-14",
        time: "15:00",
        included: true
      }
    ],
    inclusions: [
      "Return flights from Delhi to Dubai",
      "5 nights accommodation in selected hotel category",
      "Daily breakfast at the hotel",
      "Airport transfers on SIC basis",
      "Dubai city tour on SIC basis",
      "Desert Safari with BBQ dinner on SIC basis",
      "Dhow Cruise with dinner on SIC basis",
      "Burj Khalifa 124th floor tickets (non-prime hours)",
      "All taxes and service charges",
      "Tourist visa processing assistance"
    ],
    exclusions: [
      "Meals other than specified in the inclusions",
      "Optional tours and excursions",
      "Travel insurance",
      "Personal expenses (laundry, telephone calls, etc.)",
      "Visa fees",
      "Tourism dirham fee (to be paid directly at the hotel)",
      "Anything not mentioned in the inclusions"
    ]
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1583997052301-0042b33fc598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582672008243-2569804aec3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Dubai Kids Special With FREE Tickets To Aquaventure Waterpark',
    duration: '6 days & 5 nights',
    rating: 4.8,
    reviews: 425,
    originalPrice: 91437,
    discountedPrice: 68750,
    savings: 22687,
    locations: [
      { days: 6, place: 'Dubai' }
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dubai",
        "description": "Arrive at Dubai International Airport and transfer to your hotel. Spend the rest of the day at leisure or explore nearby attractions."
      },
      {
        "day": 2,
        "title": "Dubai City Tour & Desert Safari",
        "description": "Enjoy a half-day city tour visiting iconic landmarks like Burj Khalifa (outside), Dubai Museum, and Jumeirah Beach. In the afternoon, head for an exciting desert safari with dune bashing, camel rides, and a BBQ dinner."
      },
      {
        "day": 3,
        "title": "Aquaventure Waterpark Adventure",
        "description": "Have a fun-filled day at Aquaventure Waterpark with free entry included. Enjoy thrilling water rides, splash areas for kids, and relax on the private beach."
      },
      {
        "day": 4,
        "title": "Dubai Mall & KidZania",
        "description": "Spend the day at Dubai Mall with visits to the Dubai Aquarium and Underwater Zoo. Let the kids explore KidZania – a mini-city with role-playing activities."
      },
      {
        "day": 5,
        "title": "IMG Worlds of Adventure",
        "description": "Visit IMG Worlds of Adventure – Dubai's indoor theme park featuring cartoon characters, superheroes, and rides for all ages."
      },
      {
        "day": 6,
        "title": "Departure from Dubai",
        "description": "Check out from the hotel and transfer to the airport for your return flight home with wonderful memories."
      }
    ],
    "inclusions": [
    "Return flights between origin city and Dubai",
    "5 nights accommodation in a 4-star family-friendly hotel in Dubai",
    "Daily breakfast at the hotel",
    "Private airport transfers in Dubai",
    "Half-day Dubai city tour including visits to top landmarks",
    "Desert safari with dune bashing, camel ride & BBQ dinner",
    "FREE entry tickets to Aquaventure Waterpark (for kids and adults)",
    "Visit to Dubai Mall & Dubai Fountain Show",
    "Complimentary access to the hotel's kids' club and recreational facilities",
    "All hotel taxes and service charges"
  ],
  "exclusions": [
    "UAE tourism tax (to be paid directly at the hotel)",
    "Personal expenses and gratuities",
    "Travel insurance",
    "Optional tours and activities not mentioned in inclusions",
    "Visa fees (if applicable)",
    "Meals other than those specified",
    "Any COVID-19 related requirements or tests"
  ]
  },
  {
    id: 4,
   "mainImage": {
    "src": "https://images.unsplash.com/photo-1665909753520-114c2afb0f63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8VHJhZGl0aW9uYWwlMjBsb25ndGFpbCUyMGJvYXRzJTIwaW4lMjBLcmFiaSUyQyUyMFRoYWlsYW5kfGVufDB8fDB8fHww",
    "alt": "Traditional longtail boats in Krabi, Thailand"
  },
   "thumbnails": [
    {
      "id": "1",
      "src": "https://images.unsplash.com/photo-1672932669584-4dd62261e142?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fExvbmd0YWlsJTIwYm9hdHMlMjBhdCUyMHRoZSUyMGJlYWNoJTIwaW4lMjBLcmFiaXxlbnwwfHwwfHx8MA%3D%3D",
      "alt": "Longtail boats at the beach in Krabi",
      "label": "Destination"
    },
    {
      "id": "2",
      "src": "https://plus.unsplash.com/premium_photo-1670002464796-3a3136fe8808?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEx1eHVyeSUyMGJlYWNoJTIwcmVzb3J0JTIwaW4lMjBQaHVrZXR8ZW58MHx8MHx8fDA%3D",
      "alt": "Luxury beach resort in Phuket",
      "label": "Stay"
    },
    {
      "id": "3",
      "src": "https://images.unsplash.com/photo-1643216540349-e5dabfdb5b0c?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "alt": "Speedboat tour in Krabi",
      "label": "Activity & Sightseeing"
    },
    {
      "id": "4",
      "src": "https://images.unsplash.com/photo-1631609030728-9b0b525b60cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "alt": "Wat Arun temple in Bangkok",
      "label": "Cultural Landmark"
    }
  ],
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    
    title: 'Bangkok Phuket Krabi | FREE 4 Island Tour In Krabi',
    duration: '8 days & 7 nights',
    rating: 4.8,
    reviews: 2100,
    originalPrice: 80061,
    discountedPrice: 43990,
    savings: 36071,
    locations: [
      { days: 2, place: 'Bangkok' },
      { days: 3, place: 'Phuket' },
      { days: 3, place: 'Krabi' }
    ],
    "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Bangkok",
      "description": "Arrive at Bangkok Suvarnabhumi Airport. Meet your representative and transfer to your hotel. Enjoy the evening at leisure or explore local markets."
    },
    {
      "day": 2,
      "title": "Bangkok City & Temple Tour",
      "description": "Visit the Grand Palace, Wat Pho (Reclining Buddha), and Wat Arun. Enjoy a boat ride on the Chao Phraya River and explore Bangkok's vibrant culture."
    },
    {
      "day": 3,
      "title": "Fly to Phuket",
      "description": "Check out and fly to Phuket. On arrival, transfer to your resort and spend the rest of the day relaxing on the beach or exploring Patong nightlife."
    },
    {
      "day": 4,
      "title": "Phuket Island Tour",
      "description": "Explore key highlights of Phuket including Big Buddha, Wat Chalong, scenic viewpoints, and beautiful beaches. Optional: Visit to Phuket Fantasea show."
    },
    {
      "day": 5,
      "title": "Transfer to Krabi by Road",
      "description": "Travel by road from Phuket to Krabi. Check into your hotel and relax or take a walk along Ao Nang Beach in the evening."
    },
    {
      "day": 6,
      "title": "FREE 4 Island Tour in Krabi",
      "description": "Enjoy a complimentary full-day 4 Island Tour by speedboat including Phra Nang Cave Beach, Chicken Island, Tup Island, and Poda Island with snorkeling, swimming, and a picnic lunch."
    },
    {
      "day": 7,
      "title": "Leisure Day in Krabi",
      "description": "Spend the day at leisure. Optional activities include kayaking, spa treatments, or exploring local markets and cafes."
    },
    {
      "day": 8,
      "title": "Departure from Krabi",
      "description": "Check out from your hotel and transfer to Krabi Airport for your onward journey, bringing back unforgettable memories."
    }
  ],
  "inclusions": [
    "Return flights between origin city and Thailand (Bangkok/Phuket/Krabi)",
    "2 nights accommodation in Bangkok (3-star or above hotel)",
    "2 nights accommodation in Phuket (4-star beach resort)",
    "2 nights accommodation in Krabi (4-star resort)",
    "Daily breakfast at all hotels",
    "Private airport transfers in all cities",
    "Half-day Bangkok city and temple tour",
    "Phuket city tour including visit to viewpoints and beaches",
    "FREE 4 Island Tour in Krabi by speedboat with lunch (Chicken Island, Poda Island, Tup Island, Phra Nang Cave Beach)",
    "All sightseeing tours on SIC (Seat-In-Coach) basis unless mentioned",
    "All hotel taxes and service charges"
  ],
  "exclusions": [
    "Thailand tourism fees (to be paid directly at the hotel, if applicable)",
    "National park entry fee during 4 Island Tour (to be paid on the spot)",
    "Personal expenses and gratuities",
    "Travel insurance",
    "Optional tours and activities not mentioned in inclusions",
    "Visa fees (if applicable)",
    "Any COVID-19 related requirements or tests"
  ]
  },
  {
    id: 5,
    images: [
      'https://images.unsplash.com/photo-1576924542622-772481b03c89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Wonders of Thailand | Culture, Corals and Coastlines',
    duration: '8 days & 7 nights',
    rating: 4.7,
    reviews: 1800,
    originalPrice: 60200,
    discountedPrice: 49500,
    savings: 10700,
    locations: [
      { days: 2, place: 'Pattaya' },
      { days: 2, place: 'Bangkok' },
      { days: 4, place: 'Phuket' }
    ],
   "itinerary": [
    {
      "day": 1,
      "title": "Arrival in Bangkok",
      "description": "Arrive at Bangkok Suvarnabhumi Airport. Meet your representative and transfer to your hotel. Enjoy the evening at leisure or explore local markets."
    },
    {
      "day": 2,
      "title": "Bangkok City & Temple Tour",
      "description": "Visit the Grand Palace, Wat Pho (Reclining Buddha), and Wat Arun. Enjoy a boat ride on the Chao Phraya River and explore Bangkok's vibrant culture."
    },
    {
      "day": 3,
      "title": "Fly to Phuket",
      "description": "Check out and fly to Phuket. On arrival, transfer to your resort and spend the rest of the day relaxing on the beach or exploring Patong nightlife."
    },
    {
      "day": 4,
      "title": "Phuket Island Tour",
      "description": "Explore key highlights of Phuket including Big Buddha, Wat Chalong, scenic viewpoints, and beautiful beaches. Optional: Visit to Phuket Fantasea show."
    },
    {
      "day": 5,
      "title": "Transfer to Krabi by Road",
      "description": "Travel by road from Phuket to Krabi. Check into your hotel and relax or take a walk along Ao Nang Beach in the evening."
    },
    {
      "day": 6,
      "title": "FREE 4 Island Tour in Krabi",
      "description": "Enjoy a complimentary full-day 4 Island Tour by speedboat including Phra Nang Cave Beach, Chicken Island, Tup Island, and Poda Island with snorkeling, swimming, and a picnic lunch."
    },
    {
      "day": 7,
      "title": "Leisure Day in Krabi",
      "description": "Spend the day at leisure. Optional activities include kayaking, spa treatments, or exploring local markets and cafes."
    },
    {
      "day": 8,
      "title": "Departure from Krabi",
      "description": "Check out from your hotel and transfer to Krabi Airport for your onward journey, bringing back unforgettable memories."
    }
  ],
   
    summary: {
      overview: "Discover the magic of Thailand in this 5-day tour blending ancient temples, tropical islands, and vibrant city life. From the cultural richness of Bangkok to the coastal charms of Pattaya and Coral Island, enjoy an unforgettable journey with guided tours, leisure time, and premium stays.",
      keyHighlights: [
        "Visit iconic temples and palaces in Bangkok",
        "Speedboat adventure to Coral Island",
        "Ample free time for shopping and beach activities",
        "Comfortable transfers and stays in top-rated hotels"
      ],
      usps: [
        "All-inclusive package with guided tours, stays, and transfers",
        "Premium accommodations in Bangkok and Pattaya",
        "Speedboat ride and beach activities included",
        "Customizable hotel categories from Budget to Luxury"
      ],
      targetAudience: [
        "Culture and heritage enthusiasts",
        "Couples and honeymooners",
        "Families with older children",
        "Beach and island lovers"
      ]
    },
    activities: [
      {
        id: 1,
        name: "Bangkok Grand Palace & Temple Tour",
        image: "https://images.unsplash.com/photo-1587213811864-05607c7869d2?auto=format&fit=crop&w=600&q=80",
        description: "Explore Bangkok's cultural heart with visits to the Grand Palace, Wat Phra Kaew, and Wat Pho.",
        duration: "4 hours",
        included: true,
        highlights: [
          "Entrance to Grand Palace & Emerald Buddha Temple",
          "Visit to Reclining Buddha at Wat Pho",
          "Boat ride on Chao Phraya River"
        ]
      },
      {
        id: 2,
        name: "Coral Island Day Tour by Speedboat",
        image: "https://images.unsplash.com/photo-1583037189850-80e1027d9924?auto=format&fit=crop&w=600&q=80",
        description: "Enjoy a fun-filled day at Coral Island with water activities and sunbathing on white sand beaches.",
        duration: "6 hours",
        included: true,
        highlights: [
          "Roundtrip speedboat ride",
          "Optional water sports (parasailing, snorkeling)",
          "Beach lunch included"
        ]
      },
      {
        id: 3,
        name: "Evening Alcazar Show (Optional)",
        image: "https://images.unsplash.com/photo-1564518098553-d1b3e86c8e4b?auto=format&fit=crop&w=600&q=80",
        description: "Experience Pattaya's dazzling cabaret show featuring vibrant costumes, dance, and music.",
        duration: "1.5 hours",
        included: false,
        highlights: [
          "Colorful performances by professional artists",
          "World-class stage lighting and sound",
          "Cultural entertainment suitable for all ages"
        ]
      }
    ],
    stay: [
      {
        id: 1,
        hotelName: "Chatrium Hotel Riverside Bangkok",
        image: "https://images.unsplash.com/photo-1558959357-685f9f4463c4?auto=format&fit=crop&w=900&q=60",
        rating: 5,
        description: "A luxury riverside hotel in Bangkok offering modern rooms, great views, and exceptional service.",
        location: "Chao Phraya River, Bangkok",
        amenities: ["Free WiFi", "Infinity Pool", "Spa", "Fitness Center", "Riverside Dining"],
        roomType: "Grand Room with River View",
        checkInDate: "2023-06-10",
        checkOutDate: "2023-06-11",
        nights: 1
      },
      {
        id: 2,
        hotelName: "Grande Centre Point Pattaya",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=60",
        rating: 5,
        description: "A premium beachfront hotel located in Pattaya with direct access to Terminal 21 mall.",
        location: "North Pattaya Road, Pattaya",
        amenities: ["Free WiFi", "Beach Access", "Swimming Pool", "Fitness Center", "Restaurant"],
        roomType: "Deluxe Sea View Room",
        checkInDate: "2023-06-11",
        checkOutDate: "2023-06-14",
        nights: 3
      }
    ],
    flights: [
      {
        id: 1,
        airline: "Thai Airways",
        airlineImage: "https://placehold.co/80x40?text=Thai+Airways",
        flightNumber: "TG324",
        departureTime: "10:30",
        departureAirport: "Delhi International Airport",
        departureCode: "DEL",
        arrivalTime: "16:15",
        arrivalAirport: "Suvarnabhumi Airport",
        arrivalCode: "BKK",
        duration: "4h 15m",
        date: "2023-06-10",
        isReturn: false
      },
      {
        id: 2,
        airline: "Thai Airways",
        airlineImage: "https://placehold.co/80x40?text=Thai+Airways",
        flightNumber: "TG323",
        departureTime: "18:00",
        departureAirport: "Suvarnabhumi Airport",
        departureCode: "BKK",
        arrivalTime: "21:30",
        arrivalAirport: "Delhi International Airport",
        arrivalCode: "DEL",
        duration: "4h 0m",
        date: "2023-06-14",
        isReturn: true
      }
    ],
    transfers: [
      {
        id: 1,
        type: "Airport to Hotel",
        description: "Private air-conditioned car transfer from Bangkok Airport to hotel.",
        date: "2023-06-10",
        time: "16:45",
        included: true,
        additionalInfo: "Driver will be holding a placard with your name"
      },
      {
        id: 2,
        type: "Bangkok to Pattaya Hotel",
        description: "Comfortable private transfer from your Bangkok hotel to Pattaya hotel.",
        date: "2023-06-11",
        time: "09:00",
        included: true
      },
      {
        id: 3,
        type: "Hotel to Airport",
        description: "Private transfer from Pattaya to Bangkok Airport, scheduled to arrive 3 hours before your flight.",
        date: "2023-06-14",
        time: "13:30",
        included: true,
        additionalInfo: "Vehicle type: Toyota Innova or similar"
      }
    ],
    
  "inclusions": [
    "Return flights between origin city and Thailand",
    "2 nights accommodation in Bangkok (4-star hotel)",
    "2 nights accommodation in Chiang Mai (4-star hotel)",
    "2 nights accommodation in Phuket (4-star beach resort)",
    "Daily breakfast at all hotels",
    "Private airport transfers in all cities",
    "Bangkok city and temple tour including Grand Palace",
    "Chiang Mai city tour with visit to Doi Suthep Temple",
    "Elephant Sanctuary visit in Chiang Mai with lunch",
    "Phuket Coral Island tour with water activities and lunch",
    "All intercity transfers (flights or comfortable road travel as per itinerary)",
    "All sightseeing tours on SIC (Seat-In-Coach) basis unless mentioned",
    "All hotel taxes and service charges"
  ],
  "exclusions": [
    "Thailand tourism fees (to be paid directly at the hotel, if applicable)",
    "National park or activity entry fees not mentioned in inclusions",
    "Personal expenses and gratuities",
    "Travel insurance",
    "Optional tours and activities not mentioned in inclusions",
    "Visa fees (if applicable)",
    "Any COVID-19 related requirements or tests"
  ]
                        
  },
  {
    id: 6,
    images: [
      'https://images.unsplash.com/photo-1630416609382-a7141ea46eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Phuket Krabi | A Flights Inclusive DEAL',
    duration: '6 days & 5 nights',
    rating: 5.0,
    reviews: 1100,
    originalPrice: 108383,
    discountedPrice: 64900,
    savings: 43483,
    locations: [
      { days: 2, place: 'Krabi' },
      { days: 4, place: 'Phuket' }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Phuket',
        description: 'Board your flight to Phuket. Arrive at Phuket International Airport and transfer to your hotel. Rest of the day at leisure to explore nearby beaches or relax.'
      },
      {
        day: 2,
        title: 'Phuket City Tour',
        description: 'Enjoy a half-day Phuket city tour covering Big Buddha, Wat Chalong Temple, and scenic viewpoints. Evening free for shopping or optional Fantasea Show.'
      },
      {
        day: 3,
        title: 'Phi Phi Islands Tour',
        description: 'Full-day speedboat tour to Phi Phi Islands. Visit Maya Bay, snorkel in crystal-clear waters, and relax on the beach. Lunch included.'
      },
      {
        day: 4,
        title: 'Transfer to Krabi',
        description: 'Check out from your hotel in Phuket and transfer to Krabi by road or ferry. Check in to your Krabi hotel and spend the evening at Ao Nang beach.'
      },
      {
        day: 5,
        title: 'Four Islands Tour - Krabi',
        description: "Explore Krabi's Four Islands (Chicken Island, Poda Island, Tup Island, and Phra Nang Cave Beach) via speedboat. Enjoy snorkeling, beach time, and lunch."
      },
      {
        day: 6,
        title: 'Departure from Krabi',
        description: 'Check out from the hotel and transfer to Krabi International Airport for your return flight back home.'
      }
    ],
    "inclusions": [
    "Return flights between origin city and Thailand",
    "Domestic flight from Phuket to Krabi or vice versa",
    "3 nights accommodation in Phuket (4-star beach resort)",
    "2 nights accommodation in Krabi (4-star resort)",
    "Daily breakfast at all hotels",
    "Private airport and intercity transfers",
    "Phuket city tour including viewpoints and Big Buddha",
    "Half-day leisure time at Patong Beach",
    "Krabi 4 Island tour by speedboat with lunch (Chicken Island, Poda Island, Tup Island, Phra Nang Cave Beach)",
    "All sightseeing tours on SIC (Seat-In-Coach) basis unless mentioned",
    "All hotel taxes and service charges"
  ],
  "exclusions": [
    "Thailand tourism fees (to be paid directly at the hotel, if applicable)",
    "National park entry fee during island tours (to be paid on the spot)",
    "Personal expenses and gratuities",
    "Travel insurance",
    "Optional tours and activities not mentioned in inclusions",
    "Visa fees (if applicable)",
    "Any COVID-19 related requirements or tests"
  ]
  },
  {
    id: 7,
    images: [
      'https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504457047772-27faf1c00561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    title: 'Hanoi & Halong Bay | Flights Inclusive Deal',
    duration: '5 days & 4 nights',
    rating: 4.9,
    reviews: 860,
    originalPrice: 98900,
    discountedPrice: 62900,
    savings: 36000,
    locations: [
      { days: 3, place: 'Hanoi' },
      { days: 2, place: 'Halong Bay' }
    ],
    mainImage: {
      src: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Halong Bay limestone karsts in Vietnam'
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Hanoi',
        description: 'Arrive in Hanoi and transfer to your hotel. Evening walking tour through the Old Quarter and a welcome dinner of classic Vietnamese street food.'
      },
      {
        day: 2,
        title: 'Hanoi City Highlights',
        description: 'Visit Hoan Kiem Lake, the Temple of Literature, and Ho Chi Minh Mausoleum. Afternoon at leisure for coffee and shopping around the French Quarter.'
      },
      {
        day: 3,
        title: 'Halong Bay Cruise',
        description: 'Transfer to Halong Bay for an overnight cruise. Kayak among limestone karsts, visit a cave, and enjoy a sunset dinner on board.'
      },
      {
        day: 4,
        title: 'Bay Morning & Return to Hanoi',
        description: 'Tai chi on deck, breakfast on the bay, then return to Hanoi. Evening water puppet show and free time at the night market.'
      },
      {
        day: 5,
        title: 'Departure from Hanoi',
        description: 'Check out and transfer to Noi Bai International Airport for your return flight.'
      }
    ],
    inclusions: [
      'Return flights between origin city and Hanoi',
      '3 nights accommodation in Hanoi (4-star hotel)',
      '1 night Halong Bay cruise with meals on board',
      'Daily breakfast',
      'Private airport and Halong Bay transfers',
      'Hanoi city tour with English-speaking guide',
      'Kayaking and cave visit on Halong Bay',
      'All hotel taxes and service charges'
    ],
    exclusions: [
      'Vietnam visa fees',
      'Personal expenses and gratuities',
      'Travel insurance',
      'Optional tours and activities not mentioned in inclusions',
      'Meals not mentioned in the itinerary'
    ]
  },
  {
    id: 8,
    images: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    title: 'Vietnam Highlights | Hanoi, Halong & Hoi An',
    duration: '7 days & 6 nights',
    rating: 5.0,
    reviews: 640,
    originalPrice: 132500,
    discountedPrice: 84900,
    savings: 47600,
    locations: [
      { days: 2, place: 'Hanoi' },
      { days: 2, place: 'Halong Bay' },
      { days: 3, place: 'Hoi An' }
    ],
    mainImage: {
      src: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Lanterns in Hoi An Ancient Town, Vietnam'
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Hanoi',
        description: 'Arrive in Hanoi and settle into your hotel. Evening cyclo ride through the Old Quarter.'
      },
      {
        day: 2,
        title: 'Hanoi Culture Day',
        description: 'Guided tour of Hoan Kiem Lake, Ngoc Son Temple, and a local cooking class featuring pho and fresh spring rolls.'
      },
      {
        day: 3,
        title: 'Overnight Halong Bay',
        description: 'Cruise Halong Bay, visit limestone caves, and spend the night on a traditional junk boat.'
      },
      {
        day: 4,
        title: 'Fly to Da Nang & Hoi An',
        description: 'Return from the bay and take a domestic flight to Da Nang. Transfer to Hoi An Ancient Town.'
      },
      {
        day: 5,
        title: 'Hoi An Ancient Town',
        description: 'Walking tour of Japanese Covered Bridge, assembly halls, and tailor streets. Evening lantern boat ride on the Thu Bon River.'
      },
      {
        day: 6,
        title: 'Tra Que Village & Beach',
        description: 'Morning bicycle ride through Tra Que vegetable village, then an afternoon at An Bang Beach.'
      },
      {
        day: 7,
        title: 'Departure from Da Nang',
        description: 'Transfer to Da Nang International Airport for your return flight.'
      }
    ],
    inclusions: [
      'Return international flights and one domestic flight to Da Nang',
      '2 nights in Hanoi, 1 night Halong cruise, 3 nights in Hoi An',
      'Daily breakfast and cruise meals',
      'Private airport and intercity transfers',
      'Guided sightseeing in Hanoi, Halong Bay, and Hoi An',
      'Lantern boat ride in Hoi An',
      'All hotel taxes and service charges'
    ],
    exclusions: [
      'Vietnam visa fees',
      'Personal expenses and gratuities',
      'Travel insurance',
      'Optional tours and activities not mentioned in inclusions',
      'Meals not mentioned in the itinerary'
    ]
  }
];

const isOffFocusTour = (tour: TourPackage) => {
  const text = [tour.title, ...tour.locations.map((location) => location.place)].join(' ').toLowerCase();
  return /thailand|bangkok|phuket|krabi|pattaya|bali/.test(text);
};

export const focusTours = tours.filter((tour) => !isOffFocusTour(tour));

// Activities data
export const activities: Activity[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1677836292241-42a980172dd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Desert Safari with BBQ Dinner & Live Shows',
    duration: '6 hours',
    rating: 4.8,
    reviews: 876,
    price: 2750,
    location: 'Dubai'
  },
  {
    id: 2,
    image: 'https://plus.unsplash.com/premium_photo-1661964303354-f0496d6d6e0b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Burj Khalifa: At the Top Tickets (Level 124 & 125)',
    duration: '1.5 hours',
    rating: 4.7,
    reviews: 1432,
    price: 3100,
    location: 'Dubai'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1502998732392-615e9b445fa4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Dubai Aquarium & Underwater Zoo Tickets',
    duration: '2 hours',
    rating: 4.6,
    reviews: 974,
    price: 1950,
    location: 'Dubai'
  },
  {
    id: 7,
    image: 'https://www.dhowdubai.com/images/marina-dhow-cruise-dubai.jpg',
    title: 'Dubai Marina Dhow Cruise with Dinner',
    duration: '2 hours',
    rating: 4.5,
    reviews: 756,
    price: 2200,
    location: 'Dubai'
  },
  {
    id: 8,
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/4b/28/4d.jpg',
    title: 'Dubai Miracle Garden Entry Ticket',
    duration: '3 hours',
    rating: 4.4,
    reviews: 632,
    price: 1200,
    location: 'Dubai'
  },
  {
    id: 9,
    image: 'https://cdn.platinumlist.net/upload/event/promo/37459_b95f522329fa8c845ea050a8830680c5-1-en1723454043.jpg',
    title: 'Dubai Frame Entry Ticket',
    duration: '1 hour',
    rating: 4.3,
    reviews: 548,
    price: 950,
    location: 'Dubai'
  },
  {
    id: 10,
    image: 'https://www.dubaifridays.com/uploads/coupons/2024/10/2024-10-06-02-07-44-2304-1728223664.jpg',
    title: 'IMG Worlds of Adventure Ticket',
    duration: 'Full day',
    rating: 4.5,
    reviews: 823,
    price: 2900,
    location: 'Dubai'
  },
  {
    id: 11,
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/98/f5/6c.jpg',
    title: 'Abu Dhabi Ferrari World Entry Ticket',
    duration: 'Full day',
    rating: 4.7,
    reviews: 912,
    price: 3450,
    location: 'Abu Dhabi'
  },
  {
    id: 12,
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/0e/99/c9.jpg',
    title: 'Hot Air Balloon Ride Over Desert',
    duration: '5 hours',
    rating: 4.9,
    reviews: 425,
    price: 5500,
    location: 'Dubai'
  },
  {
    id: 13,
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/34/54/03/caption.jpg?w=1200&h=-1&s=1',
    title: 'Sheikh Zayed Grand Mosque Tour',
    duration: '4 hours',
    rating: 4.9,
    reviews: 1288,
    price: 2800,
    location: 'Abu Dhabi'
  },
  {
    id: 14,
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/10/01/7e/a7.jpg',
    title: 'Louvre Abu Dhabi Museum Ticket',
    duration: '3 hours',
    rating: 4.7,
    reviews: 935,
    price: 1650,
    location: 'Abu Dhabi'
  },
  {
    id: 15,
    image: 'https://static.myconnect.ae/-/media/yasconnect/project/yww/products/yitp/yww-image.jpg',
    title: 'Yas Island Theme Parks Full Day Pass',
    duration: 'Full day',
    rating: 4.8,
    reviews: 756,
    price: 3950,
    location: 'Abu Dhabi'
  },
  {
    id: 16,
    image: 'https://destinationinsight.me/wp-content/uploads/2022/11/4-Desert-Safari-with-BBQ-Dinner-Belly-Dancer-LORES.jpg',
    title: 'Desert Safari Abu Dhabi with BBQ Dinner',
    duration: '7 hours',
    rating: 4.6,
    reviews: 689,
    price: 2950,
    location: 'Abu Dhabi'
  },
  {
    id: 17,
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/84/8e/2c.jpg',
    title: 'Abu Dhabi City Tour with Presidential Palace',
    duration: '5 hours',
    rating: 4.5,
    reviews: 542,
    price: 2250,
    location: 'Abu Dhabi'
  },
  {
    id: 18,
    image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Halong Bay Day Cruise with Cave Visit',
    duration: '8 hours',
    rating: 4.8,
    reviews: 724,
    price: 4200,
    location: 'Vietnam'
  },
  {
    id: 19,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Hoi An Ancient Town Lantern Evening Walk',
    duration: '3 hours',
    rating: 4.7,
    reviews: 518,
    price: 1850,
    location: 'Vietnam'
  }
];

// Currency data
export const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', countryCode: 'in' },
  { code: 'USD', symbol: '$', name: 'US Dollar', countryCode: 'us' },
  { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'eu' },
  { code: 'GBP', symbol: '£', name: 'British Pound', countryCode: 'gb' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', countryCode: 'ae' }
];

// Tourism board alliances
export const tourismBoardAlliances: TourismBoard[] = [
  {
    id: 1,
    name: 'Visit Dubai',
    place: 'Dubai',
    website: 'https://www.visitdubai.com/',
  },
  {
    id: 2,
    name: 'Vietnam Tourism',
    place: 'Vietnam',
    website: 'https://vietnam.travel/',
  },
  {
    id: 3,
    name: 'Incredible India',
    place: 'India',
    website: 'https://www.incredibleindia.gov.in/',
  },
];

export const touristFeedback: TouristFeedback[] = [
  {
    id: 1,
    name: 'Cameron Williamson',
    location: 'Traveller, USA',
    quote: 'If you planned to spend your holidays at Istanbul, then don’t wait. Start now. The best place to explore and spend time. Don’t plan from here. If you planned to spend..',
    avatar: '/images/testimonials/cameron.svg',
    avatarBg: '#6B3D7A',
  },
  {
    id: 2,
    name: 'Jenny Wilson',
    location: 'Traveller, USA',
    quote: 'If you planned to spend your holidays at Istanbul, then don’t wait. Start now. The best place to explore and spend time. Don’t plan from here. If you planned to spend..',
    avatar: '/images/testimonials/jenny.svg',
    avatarBg: '#E8D5C4',
  },
  {
    id: 3,
    name: 'Robert Fox',
    location: 'Traveller, USA',
    quote: 'If you planned to spend your holidays at Istanbul, then don’t wait. Start now. The best place to explore and spend time. Don’t plan from here. If you planned to spend..',
    avatar: '/images/testimonials/robert.svg',
    avatarBg: '#4A6FA5',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    location: 'Traveller, USA',
    quote: 'Our Dubai family package was seamless from airport pickup to the desert safari. The itinerary was thoughtful and every stay felt well chosen.',
    avatar: '/images/testimonials/leslie.svg',
    avatarBg: '#D7B8A3',
    destinationId: 'dubai',
    trip: 'Dubai holiday',
  },
  {
    id: 5,
    name: 'Wade Warren',
    location: 'Traveller, USA',
    quote: 'Vietnam was the highlight of our year. Halong at dawn, Hanoi food walks, and quiet evenings were all planned without us having to chase a single booking.',
    avatar: '/images/testimonials/wade.svg',
    avatarBg: '#3E6B5A',
    destinationId: 'vietnam',
    trip: 'Vietnam holiday',
  },
  {
    id: 6,
    name: 'Kristin Watson',
    location: 'Traveller, USA',
    quote: 'Ladakh felt unhurried and wide open. From the monastery mornings to the high-pass drives, every detail was looked after so we could just enjoy the trip.',
    avatar: '/images/testimonials/kristin.svg',
    avatarBg: '#C9A227',
    destinationId: 'ladakh',
    trip: 'Ladakh',
  },
];

export const trustIndicators: TrustIndicator[] = [
  { id: 'itineraries', label: 'Handpicked itineraries', icon: 'clipboard' },
  { id: 'planning', label: 'Local expert planning', icon: 'compass' },
  { id: 'support', label: 'Trip support on call', icon: 'receiver' },
];

export const trustSocialLinks: TrustSocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/happyTrails',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/happytrailstourism/',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: 'https://twitter.com/happyTrails',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61575506399505',
  },
];

const catalogRatings = [
  ...tours.map((tour) => ({ rating: tour.rating, reviews: tour.reviews })),
  ...activities.map((activity) => ({ rating: activity.rating, reviews: activity.reviews })),
].filter((item) => Number.isFinite(item.rating) && Number.isFinite(item.reviews));

const happyTravelers = catalogRatings.reduce((sum, item) => sum + item.reviews, 0);
const guestSatisfaction = Math.round(
  (catalogRatings.reduce((sum, item) => sum + item.rating, 0) / catalogRatings.length / 5) * 100,
);

export const trustStats: TrustStat[] = [
  {
    id: 'travelers',
    label: 'Happy Travelers',
    value: happyTravelers,
    suffix: '+',
    icon: 'person',
  },
  {
    id: 'experiences',
    label: 'Tours & Activities',
    value: focusTours.length + activities.length,
    suffix: '+',
    icon: 'tickets',
  },
  {
    id: 'destinations',
    label: 'Destinations Covered',
    value: navigationItems.filter((item) => item.id !== 'explore').length,
    suffix: '+',
    icon: 'map',
  },
  {
    id: 'satisfaction',
    label: 'Guest Satisfaction',
    value: guestSatisfaction,
    suffix: '%',
    icon: 'glowStar',
  },
];

export const destinationPages = [
  {
    id: 'dubai',
    name: 'Dubai',
    heading: 'Dubai holiday packages',
    description:
      'A flight-inclusive city break and a family package with Aquaventure tickets. Open a card for the stay, inclusions, and enquiry form. You do not pay on this website.',
    seoTitle: 'Dubai Holiday Packages | Happy Trails Tourism',
    seoDescription:
      'Dubai holidays from Happy Trails: flight-inclusive deals, family packages, and day activities. Enquire for dates — no payment on the form.',
    visaHelp: true,
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    heading: 'Vietnam holidays',
    description:
      'Hanoi, Halong, and Hoi An packages we currently list. The team confirms stays and dates after you enquire — no payment on the form.',
    seoTitle: 'Vietnam Holiday Packages | Happy Trails Tourism',
    seoDescription:
      'Vietnam holidays from Happy Trails: Hanoi, Halong, and Hoi An packages. Enquire for dates — no payment on the form.',
    visaHelp: true,
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    heading: 'Ladakh holidays',
    description:
      'High-pass and monastery itineraries we currently list for Ladakh. The team confirms the plan after you enquire — no payment on the form.',
    seoTitle: 'Ladakh Holiday Packages | Happy Trails Tourism',
    seoDescription:
      'Ladakh holidays from Happy Trails. Enquire for dates and stay category — no payment on the form.',
    visaHelp: false,
  },
  {
    id: 'kashmir',
    name: 'Kashmir',
    heading: 'Kashmir holidays',
    description:
      'Dal Lake and mountain stays we currently list for Kashmir. The team confirms dates after you enquire — no payment on the form.',
    seoTitle: 'Kashmir Holiday Packages | Happy Trails Tourism',
    seoDescription:
      'Kashmir holidays from Happy Trails. Enquire for dates and stay category — no payment on the form.',
    visaHelp: false,
  },
  {
    id: 'north-east-india',
    name: 'North East India',
    heading: 'North East India holidays',
    description:
      'Valley and tea-garden itineraries we currently list for North East India. The team confirms the plan after you enquire — no payment on the form.',
    seoTitle: 'North East India Holiday Packages | Happy Trails Tourism',
    seoDescription:
      'North East India holidays from Happy Trails. Enquire for dates — no payment on the form.',
    visaHelp: false,
  },
];

export const destinationGuides: DestinationGuide[] = [
  {
    id: 'dubai',
    kicker: 'Plan Dubai',
    heading: 'A city break with a desert evening',
    intro:
      'Dubai fits a short holiday: skyline, malls, and the creek by day, then a desert camp or a marina dinner after dark. This page lists only the Dubai holidays and day experiences we currently sell. The team confirms dates after you enquire.',
    facts: [
      { label: 'Best time', value: 'November to March' },
      { label: 'Typical stay', value: '4 or 5 nights' },
      { label: 'Tourist visa', value: 'Help available. Fee is separate.' },
      { label: 'Getting around', value: 'Transfers, taxis, and the metro' },
    ],
    highlights: [
      {
        title: 'Skyline and Burj Khalifa',
        text: 'A city tour plus At the Top tickets on levels 124 and 125, when that stop is on your package or added as a ticket.',
        icon: 'building',
      },
      {
        title: 'Desert safari',
        text: 'Dune drive, BBQ dinner, and live shows. Cooler months are the comfortable time for this evening.',
        icon: 'desert',
      },
      {
        title: 'Marina dhow cruise',
        text: 'Dinner on the water along Dubai Marina. Easy to add to a stay, or book on its own.',
        icon: 'ship',
      },
      {
        title: 'Family days',
        text: 'The kids package includes Aquaventure tickets. Aquarium, Miracle Garden, Dubai Frame, and IMG Worlds can be added as tickets.',
        icon: 'tickets',
      },
    ],
    notes: [
      'May to September is extremely hot. Outdoor desert time and walking tours are easier from November to March.',
      'The local weekend is Friday and Saturday. Desert camps and malls are busiest then.',
      'Cover shoulders and knees in souks. Beach clubs and resorts are more relaxed.',
      'Flights and a tourist visa are included only when that package says so. Government visa fees are paid separately.',
    ],
  },
  {
    id: 'vietnam',
    kicker: 'Plan Vietnam',
    heading: 'Hanoi, Halong, and the central coast',
    intro:
      'The Vietnam holidays we list move from Hanoi’s old quarter to a Halong Bay cruise, and on the longer trip down to Hoi An. This page stays on those places. The team confirms stays and dates after you enquire.',
    facts: [
      { label: 'Best time', value: 'November to April in the north' },
      { label: 'Listed trips', value: 'Hanoi, Halong, Hoi An' },
      { label: 'Tourist visa', value: 'Help available. Fee is separate.' },
      { label: 'Pace', value: 'City days, then a bay cruise' },
    ],
    highlights: [
      {
        title: 'Hanoi on foot',
        text: 'Old-quarter streets, food, and a culture day are the city part of both Vietnam packages.',
        icon: 'map',
      },
      {
        title: 'Halong Bay',
        text: 'A day cruise or an overnight on the bay, with limestone islands. Cave visits are on the day cruise we list.',
        icon: 'ship',
      },
      {
        title: 'Hoi An',
        text: 'The highlights package continues to Da Nang and Hoi An: ancient town, Tra Que village, and beach time.',
        icon: 'camera',
      },
    ],
    notes: [
      'North Vietnam is cooler and drier from about November to April. Summer brings heat and heavier rain.',
      'Halong weather can cancel or shorten a cruise. The team confirms the sailing after you enquire.',
      'A tourist visa is a separate government fee, even when we help with the paperwork.',
    ],
  },
  {
    id: 'ladakh',
    kicker: 'Plan Ladakh',
    heading: 'High passes and slow mountain days',
    intro:
      'Ladakh is a high-altitude holiday: monasteries, open roads, and nights that get cold even in summer. Send your dates and who is travelling. The team confirms the route, stay, and any permits before the trip is locked.',
    facts: [
      { label: 'Best time', value: 'June to September' },
      { label: 'Typical stay', value: '6 to 8 nights' },
      { label: 'Tourist visa', value: 'Usually none for Indian passports' },
      { label: 'Pace', value: 'Rest on the first day' },
    ],
    highlights: [
      {
        title: 'Monastery mornings',
        text: 'The first days stay lower, around Leh, so the body can adjust before longer drives.',
        icon: 'mountain',
      },
      {
        title: 'High passes',
        text: 'Routes over the passes depend on the month and road conditions. We do not promise a road that is closed.',
        icon: 'compass',
      },
      {
        title: 'Lakes and valleys',
        text: 'Pangong and Nubra are common add-ons when the season and your pace allow them.',
        icon: 'camera',
      },
    ],
    notes: [
      'Roads are generally open from late spring through September. Winter needs a different, slower plan.',
      'Altitude sickness is common. A rest day in Leh is part of a sensible itinerary.',
      'Indian passports usually do not need a tourist visa. Inner-line permits, if the route needs them, are confirmed with the plan.',
    ],
  },
  {
    id: 'kashmir',
    kicker: 'Plan Kashmir',
    heading: 'Dal Lake mornings and valley stays',
    intro:
      'A Kashmir holiday is built around Srinagar, the lake, and gardens, with optional days toward Gulmarg or Pahalgam when the season is right. Share your dates and the team will confirm what can be held.',
    facts: [
      { label: 'Best time', value: 'March to October' },
      { label: 'Typical stay', value: '5 to 7 nights' },
      { label: 'Tourist visa', value: 'Usually none for Indian passports' },
      { label: 'Stay style', value: 'Houseboat or valley hotel' },
    ],
    highlights: [
      {
        title: 'Dal Lake',
        text: 'Mornings on the lake and a houseboat stay are the centre of most first trips.',
        icon: 'ship',
      },
      {
        title: 'Gardens and the old city',
        text: 'Shalimar, Nishat, and a slow walk through Srinagar fill an easy day.',
        icon: 'leaf',
      },
      {
        title: 'Gulmarg or Pahalgam',
        text: 'A day or an overnight out of Srinagar, depending on snow, road time, and how many nights you have.',
        icon: 'mountain',
      },
    ],
    notes: [
      'Spring and autumn are the comfortable months. July and August are warmer and busier.',
      'Gulmarg in winter is a snow trip, not the same plan as a summer valley holiday.',
      'Indian passports usually do not need a tourist visa for this trip.',
    ],
  },
  {
    id: 'north-east-india',
    kicker: 'Plan North East India',
    heading: 'Valleys, tea gardens, and unhurried roads',
    intro:
      'North East India is not one city break. Trips are usually Sikkim and Darjeeling, Meghalaya, or Assam’s tea country — one region at a time. Tell us which valleys you want and the team will shape the route.',
    facts: [
      { label: 'Best time', value: 'October to April' },
      { label: 'Typical stay', value: '6 to 8 nights' },
      { label: 'Tourist visa', value: 'Usually none for Indian passports' },
      { label: 'Pace', value: 'One region, not all seven states' },
    ],
    highlights: [
      {
        title: 'Tea gardens',
        text: 'Darjeeling and Assam days are built around the gardens, a toy train stretch, and short walks.',
        icon: 'leaf',
      },
      {
        title: 'Living root bridges',
        text: 'Meghalaya trips need extra time on foot. They are not a fit for a rushed long weekend.',
        icon: 'mountain',
      },
      {
        title: 'Monasteries in Sikkim',
        text: 'Gangtok and nearby monasteries, with mountain views when the sky is clear.',
        icon: 'compass',
      },
    ],
    notes: [
      'Monsoon, roughly June to September, makes waterfalls dramatic and roads slow. October to April is the easier window.',
      'Permits for some areas are arranged with the itinerary. Indian passports usually do not need a tourist visa.',
      'Pick one circuit. Combining Meghalaya and Sikkim in a week spends the holiday in transit.',
    ],
  },
];

export const destinationFaqs: Record<string, FaqItem[]> = {
  dubai: [
    {
      id: 'dubai-when',
      question: 'When is the best time to visit Dubai?',
      answer:
        'November to March is the comfortable season for desert safaris, marina time, and walking the city. May to September is very hot, so outdoor plans move to early morning or evening.',
    },
    {
      id: 'dubai-days',
      question: 'How many nights do the Dubai packages cover?',
      answer:
        'The holidays listed here are about 4 or 5 nights. That is enough for a city tour, one desert evening, and a marina or theme-park day. Ask if you want a slower plan.',
    },
    {
      id: 'dubai-flights',
      question: 'Are flights included?',
      answer:
        'Only when the package title says flight-inclusive. Other holidays cover the stay, transfers, and the activities written on that page. Open the card and read the inclusions before you enquire.',
    },
    {
      id: 'dubai-visa',
      question: 'Do I need a tourist visa for Dubai?',
      answer:
        'Most travellers do. Happy Trails can help with the tourist-visa paperwork for a Dubai holiday. The government visa fee is paid separately.',
    },
    {
      id: 'dubai-included',
      question: 'What is usually included?',
      answer:
        'A typical Dubai holiday includes the hotel, airport transfers, and daily breakfast, plus the tours named on that package — such as a city tour, desert safari, or dhow cruise. Tickets, visas, and meals are included only when the package lists them.',
    },
    {
      id: 'dubai-customise',
      question: 'Can you change the Dubai plan?',
      answer:
        'Yes. Tell us your dates, who is travelling, and what you want more of — a rest day, Burj Khalifa tickets, or a different hotel category. The team adjusts the plan and confirms availability. There is no payment on the enquiry form.',
    },
    {
      id: 'dubai-cancel',
      question: 'What is the cancellation policy?',
      answer:
        'Each Dubai package page lists the confirmation, refund, and cancellation terms. Charges usually rise as the travel date gets closer, so read that section before you confirm.',
    },
  ],
  vietnam: [
    {
      id: 'vietnam-list',
      question: 'What Vietnam holidays do you list?',
      answer:
        'This page lists Hanoi, Halong, and Hoi An packages we currently offer. Open a card for stays, inclusions, and the enquiry form.',
    },
    {
      id: 'vietnam-flights',
      question: 'Are flights included in Vietnam packages?',
      answer:
        'Some Vietnam holidays are marked as flight-inclusive in the title. Others cover stays, transfers, and activities only. The inclusions on that package page say exactly what is included.',
    },
    {
      id: 'vietnam-book',
      question: 'How do I request a Vietnam plan?',
      answer:
        'Use Request a plan on this page or Request Callback on a Vietnam package. There is no payment on that form. The team checks dates and availability, then confirms with you.',
    },
    {
      id: 'vietnam-visa',
      question: 'Do you help with a Vietnam tourist visa?',
      answer:
        'Yes. Visa help is available from the Visas section. Government visa fees are paid separately.',
    },
    {
      id: 'vietnam-cancel',
      question: 'What is the cancellation policy?',
      answer:
        'Each Vietnam package page lists confirmation, refund, cancellation, and payment terms. Read those before you confirm.',
    },
  ],
  ladakh: [
    {
      id: 'ladakh-list',
      question: 'What Ladakh holidays do you list?',
      answer:
        'This page lists the Ladakh itineraries we currently offer. Open a card for stays, inclusions, and the enquiry form.',
    },
    {
      id: 'ladakh-book',
      question: 'How do I request a Ladakh plan?',
      answer:
        'Use Request a plan on this page or Request Callback on a Ladakh package. There is no payment on that form. The team checks dates and availability, then confirms with you.',
    },
    {
      id: 'ladakh-visa',
      question: 'Do I need a tourist visa for Ladakh?',
      answer:
        'India trips usually do not need a tourist visa for Indian passports. The team confirms any permits the itinerary needs after you enquire.',
    },
    {
      id: 'ladakh-cancel',
      question: 'What is the cancellation policy?',
      answer:
        'Each Ladakh package page lists confirmation, refund, cancellation, and payment terms. Read those before you confirm.',
    },
  ],
  kashmir: [
    {
      id: 'kashmir-list',
      question: 'What Kashmir holidays do you list?',
      answer:
        'This page lists the Kashmir itineraries we currently offer. Open a card for stays, inclusions, and the enquiry form.',
    },
    {
      id: 'kashmir-book',
      question: 'How do I request a Kashmir plan?',
      answer:
        'Use Request a plan on this page or Request Callback on a Kashmir package. There is no payment on that form.',
    },
    {
      id: 'kashmir-visa',
      question: 'Do I need a tourist visa for Kashmir?',
      answer:
        'India trips usually do not need a tourist visa for Indian passports. The team confirms any extra documents after you enquire.',
    },
    {
      id: 'kashmir-cancel',
      question: 'What is the cancellation policy?',
      answer:
        'Each Kashmir package page lists confirmation, refund, cancellation, and payment terms. Read those before you confirm.',
    },
  ],
  'north-east-india': [
    {
      id: 'ne-list',
      question: 'What North East India holidays do you list?',
      answer:
        'This page lists the North East India itineraries we currently offer. Open a card for stays, inclusions, and the enquiry form.',
    },
    {
      id: 'ne-book',
      question: 'How do I request a North East India plan?',
      answer:
        'Use Request a plan on this page or Request Callback on a package. There is no payment on that form.',
    },
    {
      id: 'ne-visa',
      question: 'Do I need a tourist visa for North East India?',
      answer:
        'India trips usually do not need a tourist visa for Indian passports. Some circuits need inner-line permits — the team confirms that after you enquire.',
    },
    {
      id: 'ne-cancel',
      question: 'What is the cancellation policy?',
      answer:
        'Each package page lists confirmation, refund, cancellation, and payment terms. Read those before you confirm.',
    },
  ],
};

export const faqs: FaqItem[] = [
  {
    id: 'destinations',
    question: 'What destinations can I book with Happy Trails?',
    answer:
      'Happy Trails currently lists holidays and activities for Dubai, Vietnam, and India — Ladakh, Kashmir, and North East India. Open Holidays or a destination from the menu to see what is available.',
  },
  {
    id: 'flights',
    question: 'Are flights included in the packages?',
    answer:
      'Some holidays are marked as flight-inclusive in the title. Others cover stays, transfers, and activities only. The inclusions on each package page say exactly what that trip includes.',
  },
  {
    id: 'booking',
    question: 'How do I book a trip?',
    answer:
      'Use Request Callback or the enquiry form on a package page. There is no payment on that form. The team checks dates and availability, then confirms the plan with you.',
  },
  {
    id: 'customise',
    question: 'Can you customise a holiday?',
    answer:
      'Yes. Share travel dates, who is going, and what you want more of — slower days, family tickets, or a stay category. The team shapes the itinerary around that.',
  },
  {
    id: 'inclusions',
    question: 'What is usually included in a holiday?',
    answer:
      'It varies by package. Typical holiday inclusions are stays, airport transfers, daily breakfast, and the activities listed on that page. Flights, visas, insurance, and personal expenses are included only when the package says so.',
  },
  {
    id: 'visas',
    question: 'Do you help with visas?',
    answer:
      'Yes. Visa help is available from the Visas section, and some holidays include tourist visa processing assistance. Visa fees are usually paid separately.',
  },
  {
    id: 'holidays-vs-activities',
    question: 'What is the difference between Holidays and Activities?',
    answer:
      'Holidays are multi-day packages with stays and a planned itinerary. Activities are single experiences — city tours, desert safaris, or cruises — that you can add on or book on their own.',
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer:
      'Each package page lists confirmation, refund, cancellation, and payment terms. Read those before you confirm, because charges change with how close you are to the travel date.',
  },
];

export const visaDestinations: VisaDestination[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: destinationImage('dubai'),
    note: 'UAE tourist visa assistance. Some Dubai holidays already include processing help.',
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    country: 'Hanoi & Halong',
    image: destinationImage('vietnam'),
    note: 'E-visa help for Vietnam holidays. Government fees are paid separately.',
  },
];

export const visaHeroSlides: VisaHeroSlide[] = [
  {
    id: 'dubai-skyline',
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: destinationImage('dubai'),
    destinationId: 'dubai',
    label: 'Dubai',
  },
  {
    id: 'dubai-desert',
    name: 'Dubai',
    country: 'Desert nights and city lights',
    image: hdImage('https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'),
    destinationId: 'dubai',
    label: 'Desert',
  },
  {
    id: 'vietnam-halong',
    name: 'Vietnam',
    country: 'Hanoi & Halong',
    image: destinationImage('vietnam'),
    destinationId: 'vietnam',
    label: 'Halong',
  },
  {
    id: 'vietnam-hoian',
    name: 'Vietnam',
    country: 'Hoi An & the coast',
    image: hdImage('https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'),
    destinationId: 'vietnam',
    label: 'Hoi An',
  },
  {
    id: 'india-ladakh',
    name: 'India',
    country: 'Ladakh',
    image: destinationImage('ladakh'),
    destinationId: 'ladakh',
    label: 'Ladakh',
  },
  {
    id: 'india-kashmir',
    name: 'India',
    country: 'Kashmir',
    image: destinationImage('kashmir'),
    destinationId: 'kashmir',
    label: 'Kashmir',
  },
];

export const visaHelpSteps: VisaHelpStep[] = [
  {
    id: 'enquire',
    title: 'Send an enquiry',
    text: 'Share the destination, travel dates, and nationality. There is no payment on this form.',
    icon: 'clipboard',
  },
  {
    id: 'documents',
    title: 'Share documents',
    text: 'Passport bio page, a recent photo, and stay dates. The team flags anything missing.',
    icon: 'document',
  },
  {
    id: 'confirm',
    title: 'We confirm next steps',
    text: 'You get the document list, government fee, and a processing window before anything is filed.',
    icon: 'check',
  },
];

export const visaDocuments: VisaDocumentItem[] = [
  {
    id: 'passport',
    title: 'Valid passport',
    text: 'Usually at least six months validity from the travel date, with a clear bio page.',
    icon: 'passport',
  },
  {
    id: 'photo',
    title: 'Recent photograph',
    text: 'A passport-style photo, often on a white background. The team confirms the size.',
    icon: 'camera',
  },
  {
    id: 'flights',
    title: 'Travel dates',
    text: 'Intended arrival and return. A flight hold helps if you already have one.',
    icon: 'airplane',
  },
  {
    id: 'stay',
    title: 'Stay details',
    text: 'Hotel or holiday booking, or the package you are planning with Happy Trails.',
    icon: 'building',
  },
  {
    id: 'form',
    title: 'Personal details',
    text: 'Name as in the passport, nationality, and a phone or email the team can reach.',
    icon: 'clipboard',
  },
  {
    id: 'insurance',
    title: 'Insurance if asked',
    text: 'Some destinations ask for travel insurance covering the stay. Included only when required.',
    icon: 'document',
  },
];

export const visaFaqs: FaqItem[] = [
  {
    id: 'visa-where',
    question: 'Which destinations do you help with visas?',
    answer:
      'Visa help is for Dubai and Vietnam holidays. Ladakh, Kashmir, and North East India trips usually do not need a tourist visa for Indian passports.',
  },
  {
    id: 'visa-enquiry',
    question: 'Is the form a visa application? Do I pay here?',
    answer:
      'No. The form is a request for help. There is no payment on this page. The team replies with documents, the government fee, and a processing window before anything is filed.',
  },
  {
    id: 'visa-fees',
    question: 'Are government visa fees included?',
    answer:
      'No. Government visa fees, portal charges, and any embassy appointment costs stay separate. Happy Trails confirms the amount after the enquiry.',
  },
  {
    id: 'visa-documents',
    question: 'What documents will I need?',
    answer:
      'Most files start with a valid passport, a recent photograph, intended travel dates, and stay details. Exact papers change by nationality and destination — the list on this page is a starting point, not a final checklist.',
  },
  {
    id: 'visa-time',
    question: 'How long does visa help take?',
    answer:
      'It depends on the destination, visa type, and how complete the documents are. The team confirms a processing window after the enquiry. Requirements and windows change, so nothing is filed until that is checked.',
  },
  {
    id: 'visa-approval',
    question: 'Do you guarantee the visa will be approved?',
    answer:
      'No. Happy Trails helps with the request and the papers. Approval is always with the immigration authority.',
  },
  {
    id: 'visa-packages',
    question: 'Do some holidays already include visa help?',
    answer:
      'Some Dubai holidays include tourist visa processing assistance. Check the inclusions on that package page. Government fees are still usually paid separately.',
  },
  {
    id: 'visa-types',
    question: 'Which visa types can I request?',
    answer:
      'The form accepts tourist, transit, and business. The team confirms what that destination actually issues for your nationality and travel dates.',
  },
]; 