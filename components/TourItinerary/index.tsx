import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import Image from 'next/image';
import styles from './TourItinerary.module.scss';
import SectionHeading from '../SectionHeading';
import {
  BedIcon,
  BuildingIcon,
  CalendarIcon,
  CameraIcon,
  CarIcon,
  CheckBadgeIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardIcon,
  CloseIcon,
  FilterIcon,
  MapPinIcon,
  PlaneIcon,
  PlayIcon,
  StarIcon,
} from '../Icons';
import { useCurrency } from '../../context/CurrencyContext';
import { TourActivity, TourFlight, TourStay, TourSummary, TourTransfer } from '../../types/staticData';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  expanded?: boolean;
}

export interface TourItineraryProps {
  highlights?: string[];
  itinerary: ItineraryDay[];
  bannerImages: {
    src: string;
    alt: string;
  }[];
  location: string;
  duration: number;
  onTabChange?: (tab: string) => void;
  activeTab?: string;
  className?: string;
  summary?: TourSummary;
  activities?: TourActivity[];
  stay?: TourStay[];
  flights?: TourFlight[];
  transfers?: TourTransfer[];
}

type TabNames = 'Itinerary' | 'Summarised View' | 'Activities' | 'Flights' | 'Stay' | 'Transfers';

const TourItinerary: React.FC<TourItineraryProps> = ({
  highlights = [],
  itinerary,
  bannerImages,
  location,
  duration,
  onTabChange,
  activeTab = 'Itinerary',
  className,
  summary,
  activities = [],
  stay = [],
  flights = [],
  transfers = [],
}) => {
  const { formatPrice } = useCurrency();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [localActiveTab, setLocalActiveTab] = useState(activeTab);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<string | null>(null);
  const [filteredItinerary, setFilteredItinerary] = useState(itinerary);
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Update local state when props change
  useEffect(() => {
    setLocalActiveTab(activeTab);
  }, [activeTab]);
  
  // Reset activeImageIndex when bannerImages changes
  useEffect(() => {
    if (bannerImages.length > 0 && activeImageIndex >= bannerImages.length) {
      setActiveImageIndex(0);
    }
  }, [bannerImages, activeImageIndex]);

  // Update filteredItinerary when filter criteria changes
  useEffect(() => {
    if (!filterCriteria || filterCriteria === 'all') {
      setFilteredItinerary(itinerary);
      return;
    }

    if (filterCriteria === 'first-half') {
      const midpoint = Math.ceil(itinerary.length / 2);
      setFilteredItinerary(itinerary.slice(0, midpoint));
    } else if (filterCriteria === 'second-half') {
      const midpoint = Math.ceil(itinerary.length / 2);
      setFilteredItinerary(itinerary.slice(midpoint));
    } else if (filterCriteria === 'activities') {
      setFilteredItinerary(itinerary.filter(day => 
        day.description.toLowerCase().includes('tour') || 
        day.description.toLowerCase().includes('visit') ||
        day.description.toLowerCase().includes('explore')
      ));
    } else if (filterCriteria === 'leisure') {
      setFilteredItinerary(itinerary.filter(day => 
        day.description.toLowerCase().includes('leisure') || 
        day.description.toLowerCase().includes('relax') ||
        day.description.toLowerCase().includes('free')
      ));
    }
  }, [filterCriteria, itinerary]);

  useEffect(() => {
    if (!showFilterMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterMenu]);

  // Handle filter button click
  const toggleFilterMenu = useCallback(() => {
    setShowFilterMenu(prev => !prev);
  }, []);

  // Handle filter selection
  const handleFilterSelect = useCallback((criteria: string) => {
    setFilterCriteria(criteria);
    setShowFilterMenu(false);
  }, []);

  // Reset filter
  const resetFilter = useCallback(() => {
    setFilterCriteria(null);
    setFilteredItinerary(itinerary);
  }, [itinerary]);

  // Memoize tab change handler to prevent unnecessary re-renders
  const handleTabChange = useCallback((tab: string) => {
    setLocalActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  }, [onTabChange]);

  // Memoize image navigation to prevent unnecessary re-renders
  const handleImageNavigation = useCallback((direction: 'prev' | 'next') => {
    if (bannerImages.length === 0) return;
    
    if (direction === 'prev') {
      setActiveImageIndex(prev => (prev === 0 ? bannerImages.length - 1 : prev - 1));
    } else {
      setActiveImageIndex(prev => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    }
  }, [bannerImages.length]);

  // Memoize day expansion to prevent unnecessary re-renders
  const toggleDayExpansion = useCallback((day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  }, []);

  // Memoize the banner images section to prevent unnecessary re-renders
  const BannerSection = useMemo(() => {
    if (bannerImages.length === 0) return null;
    
    return (
      <div className={styles.bannerSection}>
        <div className={styles.bannerImageWrapper}>
          <div className={styles.imageNavigation}>
            <button
              type="button"
              className={`${styles.navButton} ${styles.prevBtn}`}
              onClick={() => handleImageNavigation('prev')}
              aria-label="Previous image"
            >
              <ChevronLeftIcon size={18} />
            </button>
            <div className={styles.mainImage}>
              <Image
                src={bannerImages[activeImageIndex].src}
                alt={bannerImages[activeImageIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className={styles.bannerImage}
                priority={activeImageIndex === 0}
              />
            </div>
            <button
              type="button"
              className={`${styles.navButton} ${styles.nextBtn}`}
              onClick={() => handleImageNavigation('next')}
              aria-label="Next image"
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>
          <div className={styles.imageDots}>
            {bannerImages.slice(0, 6).map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.imageDot} ${activeImageIndex === index ? styles.active : ''}`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
            {bannerImages.length > 6 && (
              <span className={styles.remainingImages}>+{bannerImages.length - 6}</span>
            )}
          </div>
        </div>
      </div>
    );
  }, [bannerImages, activeImageIndex, handleImageNavigation]);

  // Memoized itinerary days component to prevent unnecessary re-renders
  const ItineraryDays = useMemo(() => (
    <div className={styles.daysList}>
      {filteredItinerary.map((item) => (
        <div 
          key={item.day} 
          className={`${styles.dayItem} ${expandedDays.includes(item.day) ? styles.expanded : ''}`}
        >
          <button
            type="button"
            className={styles.dayHeader}
            onClick={() => toggleDayExpansion(item.day)}
            aria-expanded={expandedDays.includes(item.day)}
          >
            <span className={styles.dayNumber}>Day {item.day}</span>
            <span className={styles.dayTitle}>{item.title}</span>
            <span className={styles.iconContainer}>
              <ChevronDownIcon size={16} className={styles.expandIcon} />
            </span>
          </button>
          
          <div className={styles.dayDescription}>
            {item.description}
          </div>
        </div>
      ))}
      {filteredItinerary.length === 0 && (
        <div className={styles.noResultsMessage}>
          No days match your filter criteria. <button onClick={resetFilter} className={styles.resetButton}>Reset filter</button>
        </div>
      )}
    </div>
  ), [filteredItinerary, expandedDays, toggleDayExpansion, resetFilter]);

  // Memoize the tab content to prevent unnecessary re-renders
  const renderTabContent = useCallback(() => {
    const tabContentMap: Record<TabNames, JSX.Element> = {
      'Itinerary': (
        <div className={styles.itineraryContainer}>
          {BannerSection}
          <div className={styles.filterBar}>
            <div className={styles.filterWrapper} ref={filterRef}>
              <button 
                className={`${styles.filterButton} ${filterCriteria ? styles.filterActive : ''}`}
                onClick={toggleFilterMenu}
                aria-expanded={showFilterMenu}
              >
                <FilterIcon size={16} className={styles.filterIcon} />
                {filterCriteria ? 'Filtered' : 'Filter'}
                {filterCriteria && (
                  <button className={styles.clearFilter} onClick={(e) => { e.stopPropagation(); resetFilter(); }}>
                    <CloseIcon size={14} />
                  </button>
                )}
              </button>
              {showFilterMenu && (
                <div className={styles.filterMenu}>
                  <div className={styles.filterHeader}>
                    <h4>Filter itinerary by:</h4>
                  </div>
                  <div className={styles.filterOptions}>
                    <button
                      className={`${styles.filterOption} ${filterCriteria === null || filterCriteria === 'all' ? styles.active : ''}`}
                      onClick={() => handleFilterSelect('all')}
                    >
                      Show All Days
                    </button>
                    <button
                      className={`${styles.filterOption} ${filterCriteria === 'first-half' ? styles.active : ''}`}
                      onClick={() => handleFilterSelect('first-half')}
                    >
                      First Half of Trip
                    </button>
                    <button
                      className={`${styles.filterOption} ${filterCriteria === 'second-half' ? styles.active : ''}`}
                      onClick={() => handleFilterSelect('second-half')}
                    >
                      Second Half of Trip
                    </button>
                    <button
                      className={`${styles.filterOption} ${filterCriteria === 'activities' ? styles.active : ''}`}
                      onClick={() => handleFilterSelect('activities')}
                    >
                      Days with Activities
                    </button>
                    <button
                      className={`${styles.filterOption} ${filterCriteria === 'leisure' ? styles.active : ''}`}
                      onClick={() => handleFilterSelect('leisure')}
                    >
                      Leisure Days
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.daysIndicator}>
              {filterCriteria ? `${filteredItinerary.length} of ${duration} Days` : `${duration} Days`}
            </div>
          </div>
          {ItineraryDays}
        </div>
      ),
      
      'Summarised View': (
        <div className={styles.summarisedViewContainer}>
          {summary ? (
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Trip Overview</h3>
              <p className={styles.summaryText}>{summary.overview}</p>
              <div className={styles.summarySection}>
                <h4>Key Highlights</h4>
                <ul className={styles.summaryList}>
                  {summary.keyHighlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.summarySection}>
                <h4>Why Book This Tour</h4>
                <ul className={styles.summaryList}>
                  {summary.usps.map((usp, index) => (
                    <li key={index} className={styles.uspItem}><CheckIcon size={16} className={styles.checkIcon} /> {usp}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.summarySection}>
                <h4>Perfect For</h4>
                <div className={styles.targetAudience}>
                  {summary.targetAudience.map((audience, index) => (
                    <span key={index} className={styles.audienceTag}>{audience}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Trip Overview</h3>
              <p className={styles.summaryText}>
                Experience an unforgettable {duration}-day journey through {location}, 
                exploring ancient wonders and modern marvels. This carefully curated tour 
                offers a perfect balance of guided excursions and free time to explore on your own.
              </p>
              <div className={styles.summaryHighlights}>
                <h4>Highlights</h4>
                <ul>
                  {highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ),
      
      'Activities': (
        <div className={styles.activitiesContainer}>
          <div className={styles.activityList}>
            {activities && activities.length > 0 ? (
              activities.map(activity => (
                <div key={activity.id} className={styles.activityCard}>
                  <div className={styles.activityImageContainer}>
                    <Image
                      src={activity.image}
                      alt={activity.name}
                      width={300}
                      height={200}
                      className={styles.activityImage}
                    />
                  </div>
                  <div className={styles.activityDetails}>
                    <h3>{activity.name}</h3>
                    <p>{activity.description}</p>
                    <div className={styles.activityMeta}>
                      <span>Duration: {activity.duration}</span>
                      <span className={activity.included ? styles.included : styles.notIncluded}>
                        {activity.included ? 'Included' : `${formatPrice(activity.price || 0)} extra`}
                      </span>
                    </div>
                    {activity.highlights && (
                      <div className={styles.activityHighlights}>
                        <h4>Highlights:</h4>
                        <ul>
                          {activity.highlights.map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <PlayIcon size={36} className={styles.emptyStateIcon} />
                <h3>No Activities Information Available</h3>
                <p>This tour package doesn't include detailed activity information yet. Please check the itinerary section for included activities.</p>
              </div>
            )}
          </div>
        </div>
      ),
      
      'Flights': (
        <div className={styles.flightsContainer}>
          {flights && flights.length > 0 ? (
            flights.map(flight => (
              <div key={flight.id} className={styles.flightCard}>
                <div className={styles.flightHeader}>
                  <h3>{flight.isReturn ? 'Return Flight' : 'Outbound Flight'}</h3>
                  <span className={styles.flightDate}>{flight.date}</span>
                </div>
                <div className={styles.flightDetails}>
                  <div className={styles.airline}>
                    <Image 
                      src={flight.airlineImage}
                      alt={flight.airline}
                      width={80}
                      height={40}
                    />
                    <span>{flight.airline} - {flight.flightNumber}</span>
                  </div>
                  <div className={styles.flightRoute}>
                    <div className={styles.departure}>
                      <span className={styles.time}>{flight.departureTime}</span>
                      <span className={styles.airport}>{flight.departureCode}</span>
                      <span className={styles.airportName}>{flight.departureAirport}</span>
                    </div>
                    <div className={styles.flightPath}>
                      <div className={styles.duration}>{flight.duration}</div>
                      <div className={styles.path}></div>
                    </div>
                    <div className={styles.arrival}>
                      <span className={styles.time}>{flight.arrivalTime}</span>
                      <span className={styles.airport}>{flight.arrivalCode}</span>
                      <span className={styles.airportName}>{flight.arrivalAirport}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <PlaneIcon size={36} className={styles.emptyStateIcon} />
              <h3>Flight Details Not Available</h3>
              <p>Flight information will be provided closer to your booking date. Contact our travel experts for more details.</p>
            </div>
          )}
        </div>
      ),
      
      'Stay': (
        <div className={styles.stayContainer}>
          {stay && stay.length > 0 ? (
            stay.map(hotel => (
              <div key={hotel.id} className={styles.hotelCard}>
                <div className={styles.hotelImageContainer}>
                  <Image 
                    src={hotel.image}
                    alt={hotel.hotelName}
                    width={400}
                    height={250}
                    className={styles.hotelImage}
                  />
                </div>
                <div className={styles.hotelDetails}>
                  <h3>{hotel.hotelName}</h3>
                  <div className={styles.hotelRating}>
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon
                        key={idx}
                        size={16}
                        amount={idx < hotel.rating ? 1 : 0}
                        className={idx < hotel.rating ? styles.activeStar : styles.inactiveStar}
                      />
                    ))}
                    <span>({hotel.rating}-star hotel)</span>
                  </div>
                  <p className={styles.hotelDescription}>{hotel.description}</p>
                  <div className={styles.hotelAmenities}>
                    {hotel.amenities.map((amenity, idx) => (
                      <span key={idx}>{amenity}</span>
                    ))}
                  </div>
                  {hotel.roomType && (
                    <div className={styles.roomType}>
                      <strong>Room Type:</strong> {hotel.roomType}
                    </div>
                  )}
                  <div className={styles.stayDuration}>
                    {hotel.checkInDate && <span>Check-in: {hotel.checkInDate}</span>}
                    {hotel.checkOutDate && <span>Check-out: {hotel.checkOutDate}</span>}
                    {hotel.nights && <span>{hotel.nights} nights</span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <BedIcon size={36} className={styles.emptyStateIcon} />
              <h3>Accommodation Details Not Available</h3>
              <p>Stay information for this tour is currently being updated. Please refer to the package inclusions or contact us for details.</p>
            </div>
          )}
        </div>
      ),
      
      'Transfers': (
        <div className={styles.transfersContainer}>
          {transfers && transfers.length > 0 ? (
            transfers.map(transfer => (
              <div key={transfer.id} className={styles.transferCard}>
                <div className={styles.transferType}>
                  <CarIcon size={28} className={styles.transferIcon} />
                  <h3>{transfer.type}</h3>
                </div>
                <div className={styles.transferDetails}>
                  <div className={styles.transferInfo}>
                    <span>{transfer.included ? 'Included in Package' : 'Not Included'}</span>
                    {transfer.date && <span>{transfer.date}{transfer.time ? `, ${transfer.time}` : ''}</span>}
                  </div>
                  <p>{transfer.description}</p>
                  {transfer.additionalInfo && (
                    <div className={styles.additionalInfo}>
                      <em>Note: {transfer.additionalInfo}</em>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <CarIcon size={36} className={styles.emptyStateIcon} />
              <h3>Transfer Information Not Available</h3>
              <p>Transportation details for this tour are currently being updated. Most packages include airport transfers and local transportation between destinations.</p>
            </div>
          )}
        </div>
      )
    };

    return tabContentMap[localActiveTab as TabNames] || (
      <div className={styles.defaultContent}>
        <p>Select a tab to view details</p>
      </div>
    );
  }, [
    localActiveTab, 
    BannerSection, 
    ItineraryDays, 
    duration, 
    formatPrice, 
    location, 
    highlights, 
    summary, 
    activities, 
    flights, 
    stay, 
    transfers,
    showFilterMenu,
    filterCriteria,
    filteredItinerary,
    toggleFilterMenu,
    handleFilterSelect,
    resetFilter
  ]);

  // Memoized tab buttons to prevent unnecessary re-renders
  const TabButtons = useMemo(() => (
    <div className={styles.navigationTabs}>
      <button
        className={`${styles.navTab} ${localActiveTab === 'Itinerary' ? styles.active : ''}`}
        onClick={() => handleTabChange('Itinerary')}
      >
        <CalendarIcon size={18} className={styles.tabIcon} />
        Itinerary
      </button>
      <button
        className={`${styles.navTab} ${localActiveTab === 'Summarised View' ? styles.active : ''}`}
        onClick={() => handleTabChange('Summarised View')}
      >
        <ClipboardIcon size={18} className={styles.tabIcon} />
        Overview
      </button>
      <button
        className={`${styles.navTab} ${localActiveTab === 'Activities' ? styles.active : ''}`}
        onClick={() => handleTabChange('Activities')}
      >
        <CameraIcon size={18} className={styles.tabIcon} />
        Activities
      </button>
      <button
        className={`${styles.navTab} ${localActiveTab === 'Flights' ? styles.active : ''}`}
        onClick={() => handleTabChange('Flights')}
      >
        <PlaneIcon size={18} className={styles.tabIcon} />
        Flights
      </button>
      <button
        className={`${styles.navTab} ${localActiveTab === 'Stay' ? styles.active : ''}`}
        onClick={() => handleTabChange('Stay')}
      >
        <BuildingIcon size={18} className={styles.tabIcon} />
        Stay
      </button>
      <button
        className={`${styles.navTab} ${localActiveTab === 'Transfers' ? styles.active : ''}`}
        onClick={() => handleTabChange('Transfers')}
      >
        <MapPinIcon size={18} className={styles.tabIcon} />
        Transfers
      </button>
    </div>
  ), [localActiveTab, handleTabChange]);

  // Memoized highlights section to prevent unnecessary re-renders
  const HighlightsSection = useMemo(() => (
    <div className={styles.highlightsSection}>
      <SectionHeading
        eyebrow="Highlights"
        icon="star"
        title="Trip Highlights"
        accent={false}
        className={styles.sectionHeading}
      />
      <ul className={styles.highlightsList}>
        {highlights.map((highlight, index) => (
          <li key={index} className={styles.highlightItem}>
            <CheckBadgeIcon size={20} />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  ), [highlights]);

  return (
    <div className={`${styles.tourItineraryContainer} ${className || ''}`}>
      {highlights.length > 0 && HighlightsSection}
      {TabButtons}
      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default memo(TourItinerary);