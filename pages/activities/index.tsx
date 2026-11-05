import React, { useState, useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import SEO from '../../components/SEO';
import Icon3D from '../../components/Icon3D';
import ActivityCard from '../../components/ActivityCard';
import { activities } from '../../data/staticData';
import { UAE_EMIRATES } from '../../types/staticData';
import UaeActivityCatalog from '../../components/UaeActivityCatalog';
import styles from './Activities.module.scss';
import Header from '../../components/Header';
import SectionHeading from '../../components/SectionHeading';
import { useRouter } from 'next/router';

const ActivitiesPage: NextPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeTab, setActiveTab] = useState('activities');
  
  const locations = useMemo(
    () => [...new Set(activities.map((activity) => activity.location))],
    [],
  );

  const search = router.asPath.includes('?')
    ? router.asPath.slice(router.asPath.indexOf('?') + 1).split('#')[0]
    : '';
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get('category') || '';
  const locationFromUrl = searchParams.get('location') || '';
  const isUaeCatalog = !locationFromUrl || (UAE_EMIRATES as readonly string[]).includes(locationFromUrl);
  const isYachtCruise = category === 'cruises' || category === 'yachts';
  const isEvents = category === 'events';

  const buildActivitiesHref = (nextLocation = 'All') => {
    const nextParams = new URLSearchParams();
    if (isYachtCruise) nextParams.set('category', 'cruises');
    else if (category) nextParams.set('category', category);
    if (nextLocation !== 'All') nextParams.set('location', nextLocation);
    const query = nextParams.toString();
    return query ? `/activities?${query}` : '/activities';
  };

  useEffect(() => {
    if (locationFromUrl && locations.includes(locationFromUrl)) {
      setActiveLocation(locationFromUrl);
      return;
    }

    if (!locationFromUrl) {
      setActiveLocation('All');
    }
  }, [locationFromUrl, locations]);

  const filteredActivities = useMemo(
    () => {
      const categoryPattern =
        isYachtCruise ? /cruise|dhow|marina|boat|yacht/i
        : isEvents ? /ticket|park|garden|show|adventure|balloon/i
        : null;

      return activities.filter((activity) =>
        (activeLocation === 'All' || activity.location === activeLocation) &&
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!categoryPattern || categoryPattern.test(activity.title))
      );
    },
    [activeLocation, searchTerm, category, isYachtCruise, isEvents],
  );
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'tours') router.push('/');
    if (tab === 'activities') router.push('/activities');
    if (tab === 'visa') router.push('/?tab=visa');
  };
  
  const handleNavigate = (id: string) => {
    router.push(id === 'explore' ? '/' : `/?destination=${id}`);
  };
  
  return (
    <>
      <SEO
        title={
          isUaeCatalog && isYachtCruise
            ? 'Yacht and cruise experiences'
            : isUaeCatalog && isEvents
              ? 'Events and tickets'
              : isUaeCatalog && locationFromUrl
                ? `${locationFromUrl} activities`
                : isUaeCatalog
                  ? 'UAE activities'
                  : activeLocation === 'All'
                    ? 'Activities'
                    : `${activeLocation} activities`
        }
        description={
          isYachtCruise
            ? 'Private yachts, dhow dinners, and scenic cruises.'
            : isEvents
              ? 'Tickets and experiences from the catalog.'
              : isUaeCatalog
                ? 'Find activities across all seven UAE emirates. Availability and price are confirmed before payment.'
                : `Day trips and tickets${activeLocation === 'All' ? '' : ` in ${activeLocation}`}. Availability and price are confirmed before payment.`
        }
      />
      
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onNavigate={handleNavigate}
      />
      
      <main className={styles.main}>
        {isUaeCatalog ? <UaeActivityCatalog /> : (
        <div className={styles.container}>
          <SectionHeading
            as="h1"
            eyebrow={isYachtCruise ? 'Yacht & Cruise' : isEvents ? 'Events' : 'Activities'}
            icon={isYachtCruise ? 'yacht' : isEvents ? 'ticket' : 'camera'}
            title={
              isYachtCruise
                ? 'Yacht & Cruise'
                : isEvents
                  ? 'Events'
                  : activeLocation === 'All'
                    ? 'More Activities'
                    : `More ${activeLocation} Activities`
            }
            description={
              isYachtCruise
                ? 'Private yachts, dhow dinners, and scenic cruises.'
                : isEvents
                  ? 'Tickets and experiences from the catalog.'
                  : activeLocation === 'All'
                    ? 'Day trips and tickets you can book on their own.'
                    : `Let's explore ${activeLocation}.`
            }
          />
          
          <div className={styles.searchBar}>
            <Icon3D name="search" size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.locationsFilter}>
            <button
              className={`${styles.locationButton} ${activeLocation === 'All' ? styles.activeLocation : ''}`}
              onClick={() => {
                setActiveLocation('All');
                router.push(buildActivitiesHref('All'), undefined, { shallow: true });
              }}
            >
              All Destinations
            </button>
            {locations.map(location => (
              <button
                key={location}
                className={`${styles.locationButton} ${activeLocation === location ? styles.activeLocation : ''}`}
                onClick={() => {
                  setActiveLocation(location);
                  router.push(buildActivitiesHref(location), undefined, { shallow: true });
                }}
              >
                {location}
              </button>
            ))}
          </div>
          
          <div className={styles.activitiesGrid}>
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <ActivityCard 
                    id={String(activity.id)}
                    image={activity.image}
                    title={activity.title}
                    duration={activity.duration}
                    location={activity.location}
                    rating={activity.rating}
                    reviews={activity.reviews}
                    originalPrice={activity.price}
                    discountedPrice={Math.round(activity.price * 0.8)}
                    savings={Math.round(activity.price * 0.2)}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No activities found. Try a different search term or location.</p>
              </div>
            )}
          </div>
        </div>
        )}
      </main>
    </>
  );
};

export default ActivitiesPage; 