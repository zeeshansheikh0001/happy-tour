import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { FaSearch } from 'react-icons/fa';
import ActivityCard from '../../components/ActivityCard';
import { activities } from '../../data/staticData';
import styles from './Activities.module.scss';
import { useCurrency } from '../../context/CurrencyContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';

const ActivitiesPage: NextPage = () => {
  const router = useRouter();
  const { selectedCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeTab, setActiveTab] = useState('activities');
  
  const locations = [...new Set(activities.map(activity => activity.location))];
  
  // Set active location from URL query parameter
  useEffect(() => {
    if (router.query.location) {
      const locationParam = router.query.location as string;
      if (locations.includes(locationParam)) {
        setActiveLocation(locationParam);
      }
    }
  }, [router.query.location, locations]);
  
  const filteredActivities = activities
    .filter(activity => 
      (activeLocation === 'All' || activity.location === activeLocation) &&
      activity.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleNavigate = (id: string) => {
    console.log('Navigate to:', id);
  };
  
  return (
    <>
      <Head>
        <title>{activeLocation === 'All' ? 'All Activities' : `${activeLocation} Activities`} | Happy Tours</title>
        <meta name="description" content={`Discover amazing activities and tours in ${activeLocation === 'All' ? 'top destinations' : activeLocation} with Happy Tours`} />
      </Head>
      
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onNavigate={handleNavigate}
      />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>
            {activeLocation === 'All' 
              ? 'Discover Amazing Activities' 
              : `Discover ${activeLocation} Activities`}
          </h1>
          
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
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
                router.push('/activities', undefined, { shallow: true });
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
                  router.push(`/activities?location=${location}`, undefined, { shallow: true });
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
                    image={activity.image}
                    title={activity.title}
                    duration={activity.duration}
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
      </main>
    </>
  );
};

export default ActivitiesPage; 