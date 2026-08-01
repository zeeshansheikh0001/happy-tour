import React from 'react';
import { FaFire, FaMountain, FaCity, FaLeaf, FaUmbrellaBeach, FaSnowflake, FaBuilding } from 'react-icons/fa';
import { NavItem, TourPackage, Activity, Currency, TourismBoard } from '../types/staticData';

// Navigation items data
export const navigationItems: NavItem[] = [
  {
    name: 'Explore',
    id: 'explore',
    icon: React.createElement(FaFire),
    trending: false
  },
  {
    name: 'Ladakh',
    id: 'ladakh',
    icon: React.createElement(FaMountain),
    trending: true
  },
  {
    name: 'Singapore',
    id: 'singapore',
    icon: React.createElement(FaCity),
    trending: false
  },
  {
    name: 'Kashmir',
    id: 'kashmir',
    icon: React.createElement(FaSnowflake),
    trending: false
  },
  {
    name: 'Thailand',
    id: 'thailand',
    icon: React.createElement(FaLeaf),
    trending: false
  },
  {
    name: 'North East India',
    id: 'north-east-india',
    icon: React.createElement(FaMountain),
    trending: false
  },
  {
    name: 'Bali',
    id: 'bali',
    icon: React.createElement(FaUmbrellaBeach),
    trending: true
  },
  {
    name: 'Dubai',
    id: 'dubai',
    icon: React.createElement(FaBuilding),
    trending: false
  }
];

// Tours data
export const tours: TourPackage[] = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
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
        alt: 'Desert fort in Abu Dhabi',
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
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1580139906626-472142ceab5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555912881-1ecd82307e0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
    ],
    title: 'Singapore And Bali Honeymoon Bliss | City Romance To Tropical Retreat',
    duration: '7 days & 6 nights',
    rating: 5.0,
    reviews: 512,
    originalPrice: 84616,
    discountedPrice: 55000,
    savings: 29616,
    locations: [
      { days: 3, place: 'Singapore' },
      { days: 4, place: 'Kuta' }
    ],
    mainImage: {
      src: 'https://images.unsplash.com/photo-1602891382287-daa85a949cd1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Singapore skyline'
    },
    thumbnails: [
      {
        "id": "1",
        "src": "https://images.unsplash.com/photo-1674911848136-59493fd61ad7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "alt": "Singapore skyline",
        "label": "Destination"
      },
      {
        "id": "2",
        "src": "https://images.unsplash.com/photo-1735697538857-c80118739f50?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "alt": "Thai longtail boat at sunset",
        "label": "Beach Tour"
      },
      {
        "id": "3",
        "src": "https://plus.unsplash.com/premium_photo-1661963646506-e822afdd50cb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "alt": "Bangkok Grand Palace",
        "label": "Cultural Site"
      },
      {
        "id": "4",
        "src": "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "alt": "Krabi Island View",
        "label": "Island Hopping"
      },
      
    ],
    description: 'The perfect honeymoon package that combines the urban sophistication of Singapore with the tropical paradise of Bali.',
    packageOptions: [
      {
        days: 7,
        price: 55000,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
      }
    ],
    highlights: [
      "Experience the perfect blend of urban sophistication in Singapore and tropical paradise in Bali.",
      "Enjoy luxurious accommodations handpicked for a romantic honeymoon experience."
    ],
    bannerImages: [
      {
        src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80',
        alt: 'Singapore Marina Bay'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Singapore",
        description: "Arrive at Singapore Changi Airport and transfer to your hotel."
      },
      {
        day: 2,
        title: "Exploring Singapore",
        description: "Visit popular attractions like Marina Bay Sands, Gardens by the Bay, and enjoy a night safari adventure."
      },
      {
        day: 3,
        title: "Sentosa Island Tour",
        description: "Spend the day at Sentosa Island exploring beaches, adventure parks, and watching the Wings of Time show."
      },
      {
        day: 4,
        title: "Flight to Bali",
        description: "Check out from your Singapore hotel and fly to Bali. Upon arrival, transfer to your beach resort."
      },
      {
        day: 5,
        title: "Ubud and Kintamani Volcano Tour",
        description: "Discover the cultural heart of Bali, visit Ubud, Tegallalang rice terraces, and enjoy views of Mt. Batur."
      },
      {
        day: 6,
        title: "Romantic Beach Day",
        description: "Relax at a private beach resort or opt for a couple's spa and sunset dinner cruise."
      },
      {
        day: 7,
        title: "Departure from Bali",
        description: "Check out from the hotel and transfer to the airport for your flight back home."
      }
    ],
    inclusions: [
      "Return flights between origin city and Singapore/Bali",
      "3 nights accommodation in Singapore (4-star hotel)",
      "4 nights accommodation in Bali (5-star beach resort)",
      "Daily breakfast at hotels",
      "Private airport transfers in Singapore and Bali",
      "Half-day Singapore city tour",
      "Full-day Sentosa Island excursion with lunch",
      "Romantic sunset dinner cruise in Bali",
      "Full-day Ubud and Kintamani Volcano tour",
      "All hotel taxes and service charges"
    ],
    exclusions: [
      "Singapore tourism tax (to be paid directly at the hotel)",
      "Bali departure tax (if applicable)",
      "Personal expenses and gratuities",
      "Travel insurance",
      "Optional tours and activities not mentioned in inclusions",
      "Visa fees (if applicable)",
      "Any COVID-19 related requirements or tests"
    ]
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
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
  }
];

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
    location: 'Dubai'
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
    id: 4,
    image: 'https://cdn-imgix.headout.com/media/images/7e64811cdc4a25715f77a941467793e9-7442-singapore-universal-studio-singapore-one-day-ticket-15.jpg?auto=format&w=1170&h=576&q=90&ar=16%3A10&crop=faces%2Ccenter&fit=crop',
    title: 'Universal Studios Singapore™ Admission Ticket',
    duration: 'Full day',
    rating: 4.8,
    reviews: 2156,
    price: 5200,
    location: 'Singapore'
  },
  {
    id: 5,
    image: 'https://media1.thrillophilia.com/filestore/gi9abq82dcd46byem361ihc67sn7_universal_studio3_d260730cd9.jpg',
    title: 'Gardens by the Bay Admission Ticket',
    duration: '3 hours',
    rating: 4.7,
    reviews: 1876,
    price: 2100,
    location: 'Singapore'
  },
  {
    id: 6,
    image: 'https://4.imimg.com/data4/OK/RL/MY-10838749/item_3-thumbnail-carousel-img-740-416.jpg',
    title: 'Singapore Night Safari Admission with Transfer',
    duration: '4 hours',
    rating: 4.9,
    reviews: 1543,
    price: 4300,
    location: 'Singapore'
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
  }
];

// Currency data
export const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', countryCode: 'in' },
  { code: 'USD', symbol: '$', name: 'US Dollar', countryCode: 'us' },
  { code: 'EUR', symbol: '€', name: 'Euro', countryCode: 'eu' },
  { code: 'GBP', symbol: '£', name: 'British Pound', countryCode: 'gb' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', countryCode: 'ae' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', countryCode: 'sg' }
];

// Tourism board alliances
export const tourismBoardAlliances: TourismBoard[] = [
  {
    id: 1,
    name: 'Dubai Tourism',
    logo: '/images/tourism/dubai-tourism.webp',
    website: 'https://www.visitdubai.com/'
  },
  {
    id: 2,
    name: 'Singapore Tourism Board',
    logo: '/images/tourism/singapore-tourism.png',
    website: 'https://www.visitsingapore.com/'
  },
  {
    id: 3,
    name: 'Tourism Authority of Thailand',
    logo: '/images/tourism/thailand-tourism.png',
    website: 'https://www.tourismthailand.org/'
  },
  {
    id: 4,
    name: 'Saudi Tourism',
    logo: '/images/tourism/saudi-arabia.png',
    website: 'https://www.saudiarabia.travel/'
  },
  {
    id: 5,
    name: 'Malaysia Tourism',
    logo: '/images/tourism/malaysia-tourism.png',
    website: 'https://www.malaysia.travel/'
  },
  {
    id: 6,
    name: 'Qatar Tourism',
    logo: '/images/tourism/qatar-tourism.png',
    website: 'https://www.qatar.travel/'
  },
]; 