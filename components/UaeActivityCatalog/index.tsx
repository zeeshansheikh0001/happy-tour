import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ActivityBooking from '../ActivityBooking';
import {
    BUDGET_LABELS,
    DURATION_LABELS,
    ENVIRONMENT_LABELS,
    LEVEL_LABELS,
    uaeActivities,
} from '../../data/uaeActivities';
import { activityThumbnail } from '../../data/uaeActivityImage';
import {
    UAE_EMIRATES,
    UaeActivity,
    UaeBudget,
    UaeDuration,
    UaeEmirate,
    UaeEnvironment,
    UaeLevel,
    UaeTraveler,
} from '../../types/staticData';
import styles from './UaeActivityCatalog.module.scss';

const PAGE_SIZE = 24;

const BUDGETS: UaeBudget[] = ['free', 'budget', 'mid-range', 'luxury'];
const DURATIONS: UaeDuration[] = ['under-2-hours', 'half-day', 'full-day', 'multi-day'];
const TRAVELERS: UaeTraveler[] = ['solo', 'couple', 'family', 'group'];
const LEVELS: UaeLevel[] = ['easy', 'moderate', 'extreme'];
const ENVIRONMENTS: UaeEnvironment[] = ['indoor', 'outdoor'];

type GlyphName = 'grid' | 'camera' | 'desert' | 'water' | 'yacht' | 'mountain' | 'park';

const TRAVELER_LABELS: Record<UaeTraveler, string> = {
    solo: 'Solo',
    couple: 'Couple',
    family: 'Family',
    group: 'Group',
};

const TABS: { id: string; label: string; short: string; icon: GlyphName }[] = [
    { id: 'All', label: 'All activities', short: 'All', icon: 'grid' },
    { id: 'sightseeing', label: 'Sightseeing', short: 'Sightseeing', icon: 'camera' },
    { id: 'desert', label: 'Desert safaris', short: 'Desert', icon: 'desert' },
    { id: 'water-sports', label: 'Water sports', short: 'Water', icon: 'water' },
    { id: 'yacht-cruise', label: 'Yacht & cruise', short: 'Yacht', icon: 'yacht' },
    { id: 'mountain', label: 'Outdoors', short: 'Outdoors', icon: 'mountain' },
    { id: 'theme-parks', label: 'Theme parks', short: 'Parks', icon: 'park' },
    { id: 'diving', label: 'Diving', short: 'Diving', icon: 'water' },
    { id: 'extreme', label: 'Extreme', short: 'Extreme', icon: 'mountain' },
    { id: 'culture', label: 'Culture', short: 'Culture', icon: 'camera' },
    { id: 'nature', label: 'Nature', short: 'Nature', icon: 'mountain' },
    { id: 'beaches', label: 'Beaches', short: 'Beaches', icon: 'water' },
    { id: 'aerial', label: 'Aerial', short: 'Aerial', icon: 'mountain' },
    { id: 'food', label: 'Food', short: 'Food', icon: 'park' },
    { id: 'family', label: 'Family', short: 'Family', icon: 'park' },
    { id: 'events', label: 'Events', short: 'Events', icon: 'park' },
];

type Filters = {
    destination: string;
    category: string;
    budget: string;
    duration: string;
    traveler: string;
    level: string;
    environment: string;
    availability: string;
    search: string;
};

type SortMode = 'recommended' | 'az' | 'za';

const EMPTY_FILTERS: Filters = {
    destination: 'All',
    category: 'All',
    budget: 'All',
    duration: 'All',
    traveler: 'All',
    level: 'All',
    environment: 'All',
    availability: 'All',
    search: '',
};

const queryValue = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) return value[0] || '';
    return value || '';
};

const normalizeCategory = (value: string) => {
    if (value === 'cruises' || value === 'yachts' || value === 'yacht-cruise') return 'yacht-cruise';
    if (value === 'events') return 'events';
    if (TABS.some((item) => item.id === value)) return value;
    return 'All';
};

const categoryQueryValue = (category: string) => {
    if (category === 'yacht-cruise') return 'cruises';
    if (category === 'All') return '';
    return category;
};

const readFilters = (query: Record<string, string | string[] | undefined>): Filters => {
    const location = queryValue(query.location);
    const destination = UAE_EMIRATES.includes(location as UaeEmirate) ? location : 'All';
    const budget = queryValue(query.budget);
    const duration = queryValue(query.duration);
    const traveler = queryValue(query.traveler);
    const level = queryValue(query.level);
    const environment = queryValue(query.environment);
    const availability = queryValue(query.availability);

    return {
        destination,
        category: normalizeCategory(queryValue(query.category)),
        budget: BUDGETS.includes(budget as UaeBudget) ? budget : 'All',
        duration: DURATIONS.includes(duration as UaeDuration) ? duration : 'All',
        traveler: TRAVELERS.includes(traveler as UaeTraveler) ? traveler : 'All',
        level: LEVELS.includes(level as UaeLevel) ? level : 'All',
        environment: ENVIRONMENTS.includes(environment as UaeEnvironment) ? environment : 'All',
        availability: availability === 'seasonal' || availability === 'year-round' ? availability : 'All',
        search: queryValue(query.q),
    };
};

const matchesCategory = (activity: UaeActivity, category: string) => {
    if (category === 'All') return true;
    if (category === 'events') return activity.seasonal || activity.category === 'theme-parks';
    return activity.category === category;
};

const activityPlace = (activity: UaeActivity) => (
    activity.area ? `${activity.emirate} · ${activity.area}` : activity.emirate
);

interface RefineFieldsProps {
    filters: Filters;
    onChange: (patch: Partial<Filters>) => void;
}

function RefineFields({ filters, onChange }: RefineFieldsProps) { return (
    <>
        <label className={styles.field} htmlFor="activity-budget">
            Budget
            <select id="activity-budget" value={filters.budget} onChange={(event) => onChange({ budget: event.target.value })}>
                <option value="All">Any budget</option>
                {BUDGETS.map((budget) => (
                    <option key={budget} value={budget}>{BUDGET_LABELS[budget]}</option>
                ))}
            </select>
        </label>
        <label className={styles.field} htmlFor="activity-duration">
            Duration
            <select id="activity-duration" value={filters.duration} onChange={(event) => onChange({ duration: event.target.value })}>
                <option value="All">Any duration</option>
                {DURATIONS.map((duration) => (
                    <option key={duration} value={duration}>{DURATION_LABELS[duration]}</option>
                ))}
            </select>
        </label>
        <label className={styles.field} htmlFor="activity-traveler">
            Traveller type
            <select id="activity-traveler" value={filters.traveler} onChange={(event) => onChange({ traveler: event.target.value })}>
                <option value="All">Anyone</option>
                {TRAVELERS.map((traveler) => (
                    <option key={traveler} value={traveler}>{TRAVELER_LABELS[traveler]}</option>
                ))}
            </select>
        </label>
        <label className={styles.field} htmlFor="activity-level">
            Experience level
            <select id="activity-level" value={filters.level} onChange={(event) => onChange({ level: event.target.value })}>
                <option value="All">Any level</option>
                {LEVELS.map((level) => (
                    <option key={level} value={level}>{LEVEL_LABELS[level]}</option>
                ))}
            </select>
        </label>
        <label className={styles.field} htmlFor="activity-environment">
            Environment
            <select
                id="activity-environment"
                value={filters.environment}
                onChange={(event) => onChange({ environment: event.target.value })}
            >
                <option value="All">Indoor or outdoor</option>
                {ENVIRONMENTS.map((environment) => (
                    <option key={environment} value={environment}>{ENVIRONMENT_LABELS[environment]}</option>
                ))}
            </select>
        </label>
        <label className={styles.field} htmlFor="activity-availability">
            Time
            <select
                id="activity-availability"
                value={filters.availability}
                onChange={(event) => onChange({ availability: event.target.value })}
            >
                <option value="All">Any time</option>
                <option value="year-round">Year-round</option>
                <option value="seasonal">Seasonal</option>
            </select>
        </label>
    </>
); }

function BookingHelp({ onClose }: { onClose: () => void }) { return (
    <div className={styles.help}>
        <button type="button" className={styles.helpBackdrop} aria-label="Close" onClick={onClose} />
        <div className={styles.helpCard} role="dialog" aria-modal="true" aria-labelledby="booking-help-title">
            <h2 id="booking-help-title">How booking works</h2>
            <ol>
                <li>Request availability with your date and who is travelling.</li>
                <li>The team confirms the activity is running and sends the price.</li>
                <li>Nothing is charged until you agree.</li>
            </ol>
            <button type="button" className={styles.apply} onClick={onClose}>Close</button>
        </div>
    </div>
); }

function CategoryGlyph({ name }: { name: GlyphName }) { return (
    <svg className={styles.glyph} viewBox="0 0 24 24" aria-hidden="true">
        {name === 'grid' ? (
            <>
                <rect x="4" y="4" width="6" height="6" rx="1.4" />
                <rect x="14" y="4" width="6" height="6" rx="1.4" />
                <rect x="4" y="14" width="6" height="6" rx="1.4" />
                <rect x="14" y="14" width="6" height="6" rx="1.4" />
            </>
        ) : null}
        {name === 'camera' ? (
            <>
                <path d="M8 7.5h2l1-1.5h2l1 1.5h2.2A1.8 1.8 0 0 1 18 9.3v6.4a1.8 1.8 0 0 1-1.8 1.8H7.8A1.8 1.8 0 0 1 6 15.7V9.3A1.8 1.8 0 0 1 7.8 7.5H8z" />
                <circle cx="12" cy="12.2" r="2.4" />
            </>
        ) : null}
        {name === 'desert' ? <path d="M3 16.5c2.2-2.4 4-2.4 6.2 0 2.2-2.4 4-2.4 6.2 0 1.6-1.8 3-2.2 5.6-1.2M4 18.5h16" /> : null}
        {name === 'water' ? <path d="M3 9c2 1.4 3.2 1.4 5.2 0S11.4 7.6 13.4 9s3.2 1.4 5.2 0M3 14.5c2 1.4 3.2 1.4 5.2 0s3.2-1.4 5.2 0 3.2 1.4 5.2 0" /> : null}
        {name === 'yacht' ? <path d="M4 15.5h16l-2.2 3H6.2L4 15.5zM12 6v9.5M12 8.2l5.5 4.2" /> : null}
        {name === 'mountain' ? <path d="M3 17.5l5.2-8 3.3 4.2 2.2-3.2L21 17.5H3z" /> : null}
        {name === 'park' ? <path d="M6 18.5V9.2L12 5l6 4.2v9.3M10 18.5v-4h4v4" /> : null}
    </svg>
); }

function SearchGlyph() { return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16.5L20 20.5" />
    </svg>
); }

function PinGlyph() { return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
        <circle cx="12" cy="11" r="2" />
    </svg>
); }

function SlidersGlyph() { return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" />
        <circle cx="8" cy="7" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="10" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </svg>
); }

function InfoGlyph() { return (
    <svg className={styles.infoIcon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 11v5M12 8h.01" />
    </svg>
); }

function HeartGlyph() { return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19s-6.2-3.8-6.2-8A3.4 3.4 0 0 1 12 8.6 3.4 3.4 0 0 1 18.2 11c0 4.2-6.2 8-6.2 8z" />
    </svg>
); }


const UaeActivityCatalog: React.FC = () => {
    const router = useRouter();
    const filters = useMemo(
        () => (router.isReady ? readFilters(router.query) : EMPTY_FILTERS),
        [router.isReady, router.query],
    );
    const [searchDraft, setSearchDraft] = useState(filters.search);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [booking, setBooking] = useState<UaeActivity | null>(null);
    const [saved, setSaved] = useState<string[]>([]);
    const [sort, setSort] = useState<SortMode>('recommended');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const filterKey = JSON.stringify(filters);

    useEffect(() => {
        setSearchDraft(filters.search);
        setVisibleCount(PAGE_SIZE);
    }, [filterKey, filters.search]);

    useEffect(() => {
        if (!helpOpen) return undefined;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setHelpOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [helpOpen]);

    const replaceFilters = (next: Filters) => {
        const params = new URLSearchParams();
        if (next.destination !== 'All') params.set('location', next.destination);
        const category = categoryQueryValue(next.category);
        if (category) params.set('category', category);
        if (next.budget !== 'All') params.set('budget', next.budget);
        if (next.duration !== 'All') params.set('duration', next.duration);
        if (next.traveler !== 'All') params.set('traveler', next.traveler);
        if (next.level !== 'All') params.set('level', next.level);
        if (next.environment !== 'All') params.set('environment', next.environment);
        if (next.availability !== 'All') params.set('availability', next.availability);
        if (next.search.trim()) params.set('q', next.search.trim());
        const query = params.toString();
        router.replace(query ? `/activities?${query}` : '/activities', undefined, { shallow: true });
    };

    const update = (patch: Partial<Filters>) => {
        replaceFilters({ ...filters, search: searchDraft, ...patch });
    };

    const filtered = useMemo(() => {
        const needle = searchDraft.trim().toLowerCase();
        const matches = uaeActivities.filter((activity) => {
            const haystack = [activity.title, activity.emirate, activity.area, activity.note]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return (
                (filters.destination === 'All' || activity.emirate === filters.destination)
                && matchesCategory(activity, filters.category)
                && (filters.budget === 'All' || activity.budget === filters.budget)
                && (filters.duration === 'All' || activity.duration === filters.duration)
                && (filters.traveler === 'All' || activity.travelers.includes(filters.traveler as UaeTraveler))
                && (filters.level === 'All' || activity.level === filters.level)
                && (filters.environment === 'All' || activity.environment === filters.environment)
                && (filters.availability === 'All'
                    || (filters.availability === 'seasonal' ? activity.seasonal : !activity.seasonal))
                && (!needle || haystack.includes(needle))
            );
        });
        if (sort === 'az') return [...matches].sort((a, b) => a.title.localeCompare(b.title));
        if (sort === 'za') return [...matches].sort((a, b) => b.title.localeCompare(a.title));
        return matches;
    }, [filters, searchDraft, sort]);

    const visible = filtered.slice(0, visibleCount);
    const refineActive = (
        filters.budget !== 'All'
        || filters.duration !== 'All'
        || filters.traveler !== 'All'
        || filters.level !== 'All'
        || filters.environment !== 'All'
        || filters.availability !== 'All'
    );

    let heading = 'Activities across the UAE';
    let description = 'Find your next experience across all seven emirates.';
    if (filters.category === 'yacht-cruise') heading = 'Yacht & cruise';
    else if (filters.category === 'events') heading = 'Events';
    else if (filters.destination !== 'All') heading = `${filters.destination} activities`;
    if (filters.destination !== 'All') {
        description = `Find your next experience in ${filters.destination}.`;
    }

    const toggleSaved = (id: string) => {
        setSaved((current) => {
            if (current.includes(id)) return current.filter((item) => item !== id);
            return [...current, id];
        });
    };

    const resetRefine = () => {
        update({
            budget: 'All',
            duration: 'All',
            traveler: 'All',
            level: 'All',
            environment: 'All',
            availability: 'All',
        });
    };

    return (
        <div className={styles.wrap}>
            <header className={styles.intro}>
                <p className={styles.eyebrow}>Explore the UAE</p>
                <h1>{heading}</h1>
                <p className={styles.lead}>{description}</p>
            </header>

            <form
                className={styles.searchRow}
                onSubmit={(event) => {
                    event.preventDefault();
                    update({ search: searchDraft });
                }}
            >
                <label className={styles.searchField} htmlFor="activity-search">
                    <span className={styles.srOnly}>Search activities</span>
                    <SearchGlyph />
                    <input
                        id="activity-search"
                        type="search"
                        value={searchDraft}
                        onChange={(event) => setSearchDraft(event.target.value)}
                        placeholder="Search activities..."
                    />
                </label>
                <label className={styles.placeField} htmlFor="activity-destination">
                    <span className={styles.srOnly}>Destination</span>
                    <PinGlyph />
                    <select
                        id="activity-destination"
                        value={filters.destination}
                        onChange={(event) => update({ destination: event.target.value })}
                    >
                        <option value="All">All UAE</option>
                        {UAE_EMIRATES.map((emirate) => (
                            <option key={emirate} value={emirate}>{emirate}</option>
                        ))}
                    </select>
                </label>
                <button type="submit" className={styles.searchButton}>Search</button>
                <button
                    type="button"
                    className={styles.filterIcon}
                    aria-label="Filters"
                    onClick={() => setFiltersOpen(true)}
                >
                    <SlidersGlyph />
                </button>
            </form>

            <div className={styles.tabs} role="tablist" aria-label="Category">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={filters.category === tab.id}
                        className={`${styles.tab} ${filters.category === tab.id ? styles.tabOn : ''}`}
                        onClick={() => update({ category: tab.id })}
                    >
                        <CategoryGlyph name={tab.icon} />
                        <span className={styles.tabFull}>{tab.label}</span>
                        <span className={styles.tabShort}>{tab.short}</span>
                    </button>
                ))}
            </div>

            <div className={styles.layout}>
                <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}>
                    <button
                        type="button"
                        className={styles.drawerBackdrop}
                        aria-label="Close filters"
                        onClick={() => setFiltersOpen(false)}
                    />
                    <div className={styles.panel}>
                        <div className={styles.panelHead}>
                            <h2>Refine your search</h2>
                            <button type="button" className={styles.reset} onClick={resetRefine}>
                                Reset
                            </button>
                        </div>
                        <RefineFields filters={filters} onChange={update} />
                        <label className={`${styles.field} ${styles.sortField}`} htmlFor="activity-sort-mobile">
                            Sort
                            <select
                                id="activity-sort-mobile"
                                value={sort}
                                onChange={(event) => setSort(event.target.value as SortMode)}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="az">Name A–Z</option>
                                <option value="za">Name Z–A</option>
                            </select>
                        </label>
                        <button type="button" className={styles.apply} onClick={() => setFiltersOpen(false)}>
                            Show results
                        </button>
                    </div>
                </aside>

                <div className={styles.results}>
                    <div className={styles.resultsHead}>
                        <p className={styles.count} aria-live="polite">
                            {`${filtered.length} ${filtered.length === 1 ? 'activity' : 'activities'}`}
                        </p>
                        <label className={styles.sort} htmlFor="activity-sort">
                            <span className={styles.srOnly}>Sort</span>
                            <select
                                id="activity-sort"
                                value={sort}
                                onChange={(event) => setSort(event.target.value as SortMode)}
                            >
                                <option value="recommended">Sort: Recommended</option>
                                <option value="az">Sort: Name A–Z</option>
                                <option value="za">Sort: Name Z–A</option>
                            </select>
                        </label>
                        <button type="button" className={styles.filtersButton} onClick={() => setFiltersOpen(true)}>
                            <SlidersGlyph />
                            Filters
                        </button>
                    </div>

                    <div className={styles.notice}>
                        <InfoGlyph />
                        <p>Availability and price confirmed before payment.</p>
                        <button type="button" className={styles.helpLink} onClick={() => setHelpOpen(true)}>
                            How booking works
                        </button>
                    </div>

                    {visible.length > 0 ? (
                        <div className={styles.grid}>
                            {visible.map((activity) => (
                                <article key={activity.id} className={styles.card}>
                                    <div className={styles.photo}>
                                        <Image
                                            src={activityThumbnail(activity)}
                                            alt={activity.title}
                                            fill
                                            sizes="(max-width: 760px) 100vw, 30vw"
                                            className={styles.photoImage}
                                        />
                                        <button
                                            type="button"
                                            className={`${styles.save} ${saved.includes(activity.id) ? styles.saveOn : ''}`}
                                            aria-pressed={saved.includes(activity.id)}
                                            aria-label={saved.includes(activity.id) ? 'Remove from saved' : 'Save activity'}
                                            onClick={() => toggleSaved(activity.id)}
                                        >
                                            <HeartGlyph />
                                        </button>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <p className={styles.where}>
                                            <PinGlyph />
                                            {activity.emirate}
                                        </p>
                                        <h3>{activity.title}</h3>
                                        {activity.note ? <p className={styles.cardNote}>{activity.note}</p> : null}
                                        <button
                                            type="button"
                                            className={styles.request}
                                            onClick={() => setBooking(activity)}
                                        >
                                            Request availability
                                            <span aria-hidden="true">→</span>
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.empty}>No activities match these filters. Reset one and try again.</p>
                    )}

                    {visibleCount < filtered.length ? (
                        <button
                            type="button"
                            className={styles.more}
                            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                        >
                            {`Show more (${filtered.length - visibleCount} left)`}
                        </button>
                    ) : null}
                </div>
            </div>

            {booking ? (
                <ActivityBooking
                    open
                    onClose={() => setBooking(null)}
                    activityId={booking.id}
                    title={booking.title}
                    place={activityPlace(booking)}
                    image={activityThumbnail(booking)}
                />
            ) : null}
            {helpOpen ? <BookingHelp onClose={() => setHelpOpen(false)} /> : null}
        </div>
    );
};

export default UaeActivityCatalog;
