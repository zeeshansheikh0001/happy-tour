import React, { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DatePicker from '../DatePicker';
import Select from '../Select';
import { useCurrency } from '../../context/CurrencyContext';
import { currencies, holidayDestinations } from '../../data/staticData';
import {
    ActivityOption,
    COUNTRY_CODES,
    CustomizeFormState,
    EnquirySource,
    PARTY_LIMIT,
    activityChoicesFor,
    addNights,
    buildPayload,
    destinationName,
    destinationOptions,
    emptyForm,
    findPackage,
    firstInvalidField,
    flightsConfirmed,
    nightsBetween,
    packagesForDestination,
    prefillFromPackage,
    scopeFor,
    transfersConfirmed,
    upcomingMonths,
    validateStep,
} from '../../lib/customize/model';
import { submitCustomizeEnquiry } from '../../lib/customize/submitEnquiry';
import { createSlug } from '../../utils/slug';
import styles from './CustomizePackage.module.scss';

const STEPS = ['Trip details', 'Personalize', 'Review'] as const;
const HOTEL_CATEGORIES = [3, 4, 5];
const DEPARTURE_CITIES = [
    'Mumbai',
    'Delhi',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Kochi',
    'Goa',
    'Lucknow',
    'Dubai',
    'Abu Dhabi',
    'Singapore',
    'London',
];
const CHILD_AGES = [
    { value: '0', label: 'Under 1 year' },
    ...Array.from({ length: 11 }, (_, index) => {
        const age = String(index + 1);
        return { value: age, label: age === '1' ? '1 year' : `${age} years` };
    }),
];
const COPY = {
    1: {
        title: 'Customize your package',
        sub: "Tell us where you'd like to go.",
        mobile: 'Customize your package',
    },
    2: {
        title: 'Make this trip yours',
        sub: 'Choose what matters to you.',
        mobile: 'Personalize Your Trip',
    },
    3: {
        title: 'Review your request',
        sub: 'Tell us how to reach you.',
        mobile: 'Review',
    },
} as const;

const ICONS: Record<string, ReactNode> = {
    pin: (
        <>
            <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.2" />
        </>
    ),
    plane: (
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    ),
    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 11h18" />
        </>
    ),
    moon: <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />,
    users: (
        <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="9.5" cy="7" r="3" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
    ),
    info: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v6M12 8h.01" />
        </>
    ),
    bed: (
        <>
            <path d="M3 19V9M21 19v-7a2 2 0 0 0-2-2H11" />
            <path d="M3 15h18M3 19h18M3 19v2M21 19v2" />
            <circle cx="7" cy="11" r="1.6" />
        </>
    ),
    shield: (
        <>
            <path d="M12 3 5 6v6c0 4.2 2.8 7.2 7 8.5 4.2-1.3 7-4.3 7-8.5V6l-7-3z" />
            <path d="m9 12 2 2 4-4" />
        </>
    ),
    check: <path d="m5 12 5 5L20 7" />,
    minus: <path d="M5 12h14" />,
    plus: (
        <>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </>
    ),
    close: <path d="M6 6l12 12M18 6 6 18" />,
    arrowLeft: <path d="M15 6 9 12l6 6" />,
    arrowRight: <path d="m9 6 6 6-6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    mountain: (
        <>
            <path d="m8 18 4-9 4 9" />
            <path d="M3 18h18" />
            <path d="m13 18 2.5-4L20 18" />
        </>
    ),
    building: (
        <>
            <path d="M4 20V7l8-3 8 3v13" />
            <path d="M4 20h16M9 20v-4h6v4" />
            <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
        </>
    ),
    search: (
        <>
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-3.5-3.5" />
        </>
    ),
    ship: (
        <>
            <path d="M4 15h16l-1.5 4h-13L4 15z" />
            <path d="M6 15 8 8h5l2 7M12 8V4M9 4h6" />
        </>
    ),
    car: (
        <>
            <path d="M3 13h18v5H3z" />
            <path d="M5 13 7 8h10l2 5" />
            <circle cx="7.5" cy="18" r="1.3" />
            <circle cx="16.5" cy="18" r="1.3" />
        </>
    ),
};

interface CustomizePackageProps {
    source: EnquirySource;
    packageQuery?: string;
    idQuery?: string;
    destinationQuery?: string;
    interestQuery?: string;
}

function Icon({ name }: { name: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {ICONS[name]}
        </svg>
    );
}

function FieldError({ id, message }: { id: string; message?: string }) {
    if (!message) return null;
    return (
        <span id={`${id}-error`} className={styles.error}>
            {message}
        </span>
    );
}

function ControlField({
    id,
    label,
    error,
    icon,
    date,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    icon?: string;
    date?: boolean;
    children: ReactNode;
}) {
    return (
        <div className={styles.field}>
            <label id={`${id}-label`} htmlFor={id} className={styles.fieldLabel}>
                {label}
            </label>
            <div
                className={`${styles.control} ${date ? styles.dateControl : ''} ${
                    error ? styles.controlInvalid : ''
                }`}
            >
                {icon ? (
                    <span className={styles.controlIcon}>
                        <Icon name={icon} />
                    </span>
                ) : null}
                {children}
            </div>
            <FieldError id={id} message={error} />
        </div>
    );
}

function Counter({
    id,
    label,
    hint,
    value,
    min,
    disablePlus,
    onChange,
}: {
    id: string;
    label: string;
    hint: string;
    value: number;
    min: number;
    disablePlus: boolean;
    onChange: (value: number) => void;
}) {
    return (
        <div className={styles.traveller}>
            <div>
                <strong>{label}</strong>
                <p>{hint}</p>
            </div>
            <div className={styles.counter}>
                <button
                    id={id}
                    type="button"
                    aria-label={`Fewer ${label.toLowerCase()}`}
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min}
                >
                    <Icon name="minus" />
                </button>
                <span aria-live="polite">{value}</span>
                <button
                    type="button"
                    aria-label={`More ${label.toLowerCase()}`}
                    onClick={() => onChange(value + 1)}
                    disabled={disablePlus}
                >
                    <Icon name="plus" />
                </button>
            </div>
        </div>
    );
}

function activityIcon(name: string) {
    const value = name.toLowerCase();
    if (value.includes('desert') || value.includes('safari')) return 'mountain';
    if (value.includes('dhow') || value.includes('cruise') || value.includes('boat')) return 'ship';
    if (value.includes('city') || value.includes('tour') || value.includes('cultural')) {
        return 'building';
    }
    return 'pin';
}

function parseIso(value: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    return date;
}

function formatRange(start: string, end: string) {
    const from = parseIso(start);
    const to = parseIso(end);
    if (!from || !to) return '';
    const day = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = (date: Date) => date.toLocaleDateString('en-GB', { month: 'short' });
    const monthYear = (date: Date) =>
        date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
        return `${day(from)}–${day(to)} ${monthYear(to)}`;
    }
    if (from.getFullYear() === to.getFullYear()) {
        return `${day(from)} ${month(from)} – ${day(to)} ${monthYear(to)}`;
    }
    return `${day(from)} ${monthYear(from)} – ${day(to)} ${monthYear(to)}`;
}

function travellerLine(form: CustomizeFormState, withAges: boolean) {
    const adults = `${form.adults} adult${form.adults === 1 ? '' : 's'}`;
    if (!form.children) return adults;
    const children = `${form.children} child${form.children === 1 ? '' : 'ren'}`;
    const ages = form.childAges.filter(Boolean);
    if (withAges && ages.length) {
        const agesLabel = ages.length === 1 ? `age ${ages[0]}` : `ages ${ages.join(', ')}`;
        return `${adults} · ${children} (${agesLabel})`;
    }
    return `${adults} · ${children}`;
}

function yesNo(value: boolean | null, included: boolean) {
    if (included || value === true) return 'Yes';
    if (value === false) return 'No';
    return 'Not chosen';
}

function TripPreview({
    step,
    photo,
    placeName,
    whenLabel,
    nights,
    travellers,
    travellersDetailed,
    departure,
    stayLine,
    activities,
    transfers,
    flights,
    budgetLabel,
    embedded,
}: {
    step: 1 | 2 | 3;
    photo: string;
    placeName: string;
    whenLabel: string;
    nights: string;
    travellers: string;
    travellersDetailed: string;
    departure: string;
    stayLine: string;
    activities: ActivityOption[];
    transfers: string;
    flights: string;
    budgetLabel: string;
    embedded: boolean;
}) {
    const nightsLabel = nights ? `${nights} night${nights === '1' ? '' : 's'}` : 'Nights not set';
    return (
        <div className={styles.preview}>
            {step > 1 && !embedded ? <h2 className={styles.previewTitle}>Trip summary</h2> : null}
            {photo ? (
                <img
                    className={styles.previewImage}
                    src={photo}
                    alt={placeName ? `${placeName} photo` : 'Destination photo'}
                />
            ) : (
                <div className={styles.previewFallback} />
            )}
            {step === 1 ? (
                <>
                    <h2 className={styles.previewHeading}>
                        {placeName ? `Your ${placeName} trip` : 'Your trip'}
                    </h2>
                    <ul className={styles.facts}>
                        <li>
                            <Icon name="calendar" />
                            {whenLabel}
                        </li>
                        <li>
                            <Icon name="moon" />
                            {nightsLabel}
                        </li>
                        <li>
                            <Icon name="users" />
                            {travellers}
                        </li>
                        <li>
                            <Icon name="plane" />
                            {departure ? `Departing ${departure}` : 'Departure not chosen'}
                        </li>
                    </ul>
                    <p className={styles.note}>
                        <Icon name="info" />
                        You can refine your trip next.
                    </p>
                </>
            ) : (
                <>
                    <ul className={styles.facts}>
                        <li>
                            <Icon name="pin" />
                            {placeName || 'Destination not chosen'}
                        </li>
                        <li>
                            <Icon name="calendar" />
                            {whenLabel}
                        </li>
                        <li>
                            <Icon name="moon" />
                            {nightsLabel}
                        </li>
                        <li>
                            <Icon name="users" />
                            {travellersDetailed}
                        </li>
                        <li>
                            <Icon name="bed" />
                            {stayLine || 'Stay not chosen'}
                        </li>
                        {step === 3 && budgetLabel ? (
                            <li>
                                <Icon name="shield" />
                                {budgetLabel}
                            </li>
                        ) : null}
                    </ul>
                    {activities.length > 0 && (
                        <>
                            <p className={styles.previewLabel}>Activities</p>
                            <div className={styles.chips}>
                                {activities.map((item) => (
                                    <span key={item.key} className={styles.chip}>
                                        <Icon name={activityIcon(item.name)} />
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                    <ul className={styles.facts}>
                        <li>
                            <Icon name="car" />
                            {`Airport transfers: ${transfers}`}
                        </li>
                        <li>
                            <Icon name="plane" />
                            {`Request flights: ${flights}`}
                        </li>
                    </ul>
                    <p className={styles.note}>
                        <Icon name="info" />
                        Final options confirmed with your quote.
                    </p>
                </>
            )}
        </div>
    );
}

const CustomizePackage: React.FC<CustomizePackageProps> = ({
    source,
    packageQuery,
    idQuery,
    destinationQuery,
    interestQuery,
}) => {
    const router = useRouter();
    const { selectedCurrency } = useCurrency();
    const submitLock = useRef(false);
    const currencyTouched = useRef(false);
    const bodyRef = useRef<HTMLDivElement>(null);
    const selectedPackage = useMemo(
        () => findPackage(packageQuery, idQuery),
        [packageQuery, idQuery],
    );
    const [form, setForm] = useState<CustomizeFormState>(() => {
        const next = selectedPackage ? prefillFromPackage(selectedPackage) : emptyForm();
        if (!selectedPackage && destinationQuery && destinationOptions().some((item) => item.id === destinationQuery)) {
            next.destinationId = destinationQuery;
        }
        if (interestQuery) {
            const line = `Activity interest: ${interestQuery}`;
            next.specialRequests = next.specialRequests ? `${next.specialRequests}\n${line}` : line;
        }
        return next;
    });
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [notice, setNotice] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [budgetCurrency, setBudgetCurrency] = useState(selectedCurrency.code);
    const [activityQuery, setActivityQuery] = useState('');
    const [showAllActivities, setShowAllActivities] = useState(false);

    const months = useMemo(() => upcomingMonths(), []);
    const destinations = destinationOptions();
    const destinationPackages = packagesForDestination(form.destinationId);
    const scope = scopeFor(form.destinationId, form.packageId);
    const activities = useMemo(
        () => activityChoicesFor(form.destinationId, form.packageId),
        [form.destinationId, form.packageId],
    );
    const activePackage =
        form.packageId == null
            ? null
            : destinationPackages.find((item) => item.id === form.packageId) ?? selectedPackage;
    const flightsIncluded = flightsConfirmed(activePackage);
    const transfersIncluded = transfersConfirmed(activePackage);
    const copy = COPY[step];
    const destination = holidayDestinations.find((item) => item.id === form.destinationId);
    const photo = destination?.image || activePackage?.images?.[0] || '';
    const monthLabel = months.find((item) => item.value === form.flexibleMonth)?.label ?? '';
    const whenLabel = form.flexible
        ? monthLabel || 'Flexible dates'
        : formatRange(form.startDate, form.endDate) || 'Dates not chosen';
    const placeName = destinationName(form.destinationId);
    const summaryBits = [
        placeName,
        whenLabel === 'Dates not chosen' || whenLabel === 'Flexible dates' ? '' : whenLabel,
    ];
    if (step > 1 && form.nights) summaryBits.push(`${form.nights} nights`);
    const summaryLine = summaryBits.filter(Boolean).join(' · ') || 'Add a destination to begin';
    const selectedActivities = activities.filter((item) => form.activityKeys.includes(item.key));
    const activityQueryText = activityQuery.trim().toLowerCase();
    const activityMatches = activities.filter((item) => {
        if (!activityQueryText) return true;
        const haystack = `${item.name} ${item.duration}`.toLowerCase();
        return haystack.includes(activityQueryText);
    });
    const selectedKeySet = new Set(form.activityKeys);
    const pinnedActivities = activityMatches.filter(
        (item) => selectedKeySet.has(item.key) || item.included,
    );
    const otherActivities = activityMatches.filter(
        (item) => !selectedKeySet.has(item.key) && !item.included,
    );
    const matchKeys = new Set(activityMatches.map((item) => item.key));
    const selectedOutside = activities.filter(
        (item) => selectedKeySet.has(item.key) && !matchKeys.has(item.key),
    );
    const visibleActivities =
        activityQueryText || showAllActivities
            ? [...selectedOutside, ...activityMatches]
            : [...pinnedActivities, ...otherActivities.slice(0, 8)];
    const shownMatches = visibleActivities.filter((item) => matchKeys.has(item.key)).length;
    const hiddenActivityCount = Math.max(0, activityMatches.length - shownMatches);
    const nightsCount = Number(form.nights) || 0;
    const picked = form.activityKeys.length;
    let activityNote = 'Choose any activities you want. The team confirms what fits your dates.';
    if (picked > Math.max(4, nightsCount)) {
        activityNote = `${picked} selected. That is more than these nights usually fit. `
            + 'The team will suggest what works.';
    } else if (picked > 0) {
        activityNote = `${picked} selected. The team confirms what fits your dates.`;
    }
    const roomCount = Math.max(1, Number(form.rooms) || 1);
    const stayLine = [
        form.rooms ? `${roomCount} room${roomCount === 1 ? '' : 's'}` : '',
        form.hotelCategory ? `${form.hotelCategory}-star` : '',
    ]
        .filter(Boolean)
        .join(' · ');
    const budgetLabel =
        form.budgetMin && form.budgetMax
            ? `${budgetCurrency} ${form.budgetMin}–${form.budgetMax} ${
                  form.budgetBasis === 'per-person' ? 'per person' : 'total trip'
              }`
            : '';
    const departureOptions = useMemo(() => {
        const cities = [...DEPARTURE_CITIES];
        if (form.departureCity && !cities.includes(form.departureCity)) {
            cities.unshift(form.departureCity);
        }
        return cities.map((city) => ({ value: city, label: city }));
    }, [form.departureCity]);
    const currencyOptions = currencies.map((item) => ({ value: item.code, label: item.code }));

    useEffect(() => {
        if (!currencyTouched.current) setBudgetCurrency(selectedCurrency.code);
    }, [selectedCurrency.code]);

    useEffect(() => {
        if (!dirty || succeeded) return undefined;
        const warning = 'Leave this form? The details you entered will be lost.';
        const onLeave = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };
        const onClick = (event: MouseEvent) => {
            const blocked =
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey;
            if (blocked) return;
            const anchor = (event.target as HTMLElement | null)?.closest('a');
            if (!anchor || anchor.target === '_blank') return;
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#')) return;
            if (window.confirm(warning)) return;
            event.preventDefault();
            event.stopPropagation();
        };
        window.addEventListener('beforeunload', onLeave);
        document.addEventListener('click', onClick, true);
        router.beforePopState(() => window.confirm(warning));
        return () => {
            window.removeEventListener('beforeunload', onLeave);
            document.removeEventListener('click', onClick, true);
            router.beforePopState(() => true);
        };
    }, [dirty, succeeded, router]);

    const mark = (patch: Partial<CustomizeFormState>) => {
        setDirty(true);
        setSubmitError('');
        setForm((current) => ({ ...current, ...patch }));
    };

    const focusField = (fieldId?: string) => {
        if (!fieldId) return;
        window.requestAnimationFrame(() => {
            const node = document.getElementById(fieldId);
            node?.focus();
            node?.scrollIntoView({ block: 'center' });
        });
    };

    const goToStep = (next: 1 | 2 | 3) => {
        setErrors({});
        setStep(next);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        bodyRef.current?.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    };

    const continueStep = () => {
        const nextErrors = validateStep(step, form, HOTEL_CATEGORIES, flightsIncluded);
        setErrors(nextErrors);
        const invalid = firstInvalidField(nextErrors);
        if (invalid) {
            focusField(invalid);
            return;
        }
        goToStep((step + 1) as 2 | 3);
    };

    const close = () => {
        if (
            dirty &&
            !succeeded &&
            !window.confirm('Leave this form? The details you entered will be lost.')
        ) {
            return;
        }
        setDirty(false);
        router.beforePopState(() => true);
        if (window.history.length > 1) {
            router.back();
            return;
        }
        const fallback = selectedPackage ? `/tours/${createSlug(selectedPackage.title)}` : '/';
        router.push(fallback);
    };

    const changeDestination = (destinationId: string) => {
        const nextPackages = packagesForDestination(destinationId);
        const packageStillValid =
            form.packageId != null && nextPackages.some((item) => item.id === form.packageId);
        const nextPackageId = packageStillValid ? form.packageId : null;
        const allowed = new Set(activityChoicesFor(destinationId, nextPackageId).map((item) => item.key));
        setActivityQuery('');
        setShowAllActivities(false);
        const kept = form.activityKeys.filter((key) => allowed.has(key));
        const notes: string[] = [];
        if (form.packageId != null && !packageStillValid) {
            notes.push(
                'The previous package is not listed for this destination, so it was cleared.',
            );
        }
        if (kept.length !== form.activityKeys.length) {
            notes.push('Activities from the previous destination were cleared.');
        }
        setNotice(notes.join(' '));
        mark({
            destinationId,
            packageId: packageStillValid ? form.packageId : null,
            activityKeys: kept,
            hotelCategory: form.hotelCategory,
            flightsRequired: packageStillValid ? form.flightsRequired : null,
            requestTransfers: packageStillValid ? form.requestTransfers : false,
        });
    };

    const changeNights = (nights: string) => {
        const count = Number(nights);
        const endDate =
            !form.flexible && form.startDate && Number.isInteger(count) && count > 0
                ? addNights(form.startDate, count)
                : form.endDate;
        mark({ nights, endDate });
    };

    const changeStart = (startDate: string) => {
        const count = Number(form.nights);
        const endDate =
            !form.flexible && startDate && Number.isInteger(count) && count > 0
                ? addNights(startDate, count)
                : form.endDate;
        mark({ startDate, endDate });
    };

    const changeEnd = (endDate: string) => {
        const span = nightsBetween(form.startDate, endDate);
        mark({ endDate, nights: span ? String(span) : form.nights });
    };

    const changeChildren = (children: number) => {
        const childAges = form.childAges.slice(0, children);
        while (childAges.length < children) childAges.push('');
        mark({ children, childAges });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (step < 3) {
            continueStep();
            return;
        }
        if (submitLock.current || submitting || succeeded) return;
        submitLock.current = true;
        const nextErrors = validateStep(3, form, HOTEL_CATEGORIES, flightsIncluded);
        setErrors(nextErrors);
        const invalid = firstInvalidField(nextErrors);
        if (invalid) {
            submitLock.current = false;
            focusField(invalid);
            return;
        }
        setSubmitting(true);
        setSubmitError('');
        const result = await submitCustomizeEnquiry(
            buildPayload(form, source, budgetCurrency, scope, activities),
        );
        setSubmitting(false);
        if (result.ok) {
            setSucceeded(true);
            setDirty(false);
            return;
        }
        submitLock.current = false;
        setSubmitError(result.message || 'The request was not sent. You can try again.');
    };

    const described = (id: string) => (errors[id] ? `${id}-error` : undefined);

    if (succeeded) {
        return (
            <div className={styles.screen}>
                <section className={styles.card}>
                    <div className={styles.success}>
                        <p className={styles.kicker}>Request received</p>
                        <h1>Your request has been received.</h1>
                        <p>
                            Our team will contact you with a customized quote. Nothing is reserved
                            until the team confirms it with you.
                        </p>
                        <Link href="/" className={styles.primaryLink}>
                            Back to holidays
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    const preview = (
        <TripPreview
            step={step}
            photo={photo}
            placeName={placeName}
            whenLabel={whenLabel}
            nights={form.nights}
            travellers={travellerLine(form, false)}
            travellersDetailed={travellerLine(form, true)}
            departure={form.departureCity}
            stayLine={stayLine}
            activities={selectedActivities}
            transfers={yesNo(form.requestTransfers, transfersIncluded)}
            flights={yesNo(form.flightsRequired, flightsIncluded)}
            budgetLabel={budgetLabel}
            embedded={false}
        />
    );

    return (
        <div className={styles.screen}>
            <form className={styles.card} onSubmit={handleSubmit} noValidate>
                <div className={styles.body} ref={bodyRef}>
                    <div className={`${styles.top} ${step > 1 ? styles.topLater : ''}`}>
                        <button
                            type="button"
                            className={styles.backIcon}
                            aria-label="Back"
                            onClick={step === 1 ? close : () => goToStep((step - 1) as 1 | 2)}
                        >
                            <Icon name="arrowLeft" />
                        </button>
                        <div className={styles.headerText}>
                            {step === 1 ? (
                                <>
                                    <h1 id="customize-title">{copy.title}</h1>
                                    <p className={styles.sub}>{copy.sub}</p>
                                </>
                            ) : (
                                <p className={styles.mobileTitle}>{copy.mobile}</p>
                            )}
                            <p className={styles.stepCue}>
                                {`Step ${step} of 3${step === 1 ? ': Trip details' : ''}`}
                            </p>
                        </div>
                        <ol className={styles.stepper} aria-label="Progress">
                            {STEPS.map((label, index) => {
                                const number = index + 1;
                                let state = '';
                                if (number < step) state = styles.stepDone;
                                else if (number === step) state = styles.stepCurrent;
                                return (
                                    <li
                                        key={label}
                                        className={`${styles.step} ${state}`}
                                        aria-current={number === step ? 'step' : undefined}
                                    >
                                        <span className={styles.bubble}>
                                            {number < step ? <Icon name="check" /> : number}
                                        </span>
                                        {label}
                                    </li>
                                );
                            })}
                        </ol>
                        <button
                            type="button"
                            className={styles.close}
                            aria-label="Close"
                            onClick={close}
                        >
                            <Icon name="close" />
                        </button>
                        {step > 1 && (
                            <div className={styles.sectionHead}>
                                <h1 id="customize-title">{copy.title}</h1>
                                <p>{copy.sub}</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.columns}>
                        <div className={styles.formColumn}>
                            <details className={styles.summaryMobile}>
                                <summary className={styles.summaryToggle}>
                                    {photo ? (
                                        <img src={photo} alt="" className={styles.thumb} />
                                    ) : (
                                        <span className={styles.thumbFallback} />
                                    )}
                                    <span className={styles.summaryMeta}>
                                        <strong>Trip summary</strong>
                                        <span>{summaryLine}</span>
                                    </span>
                                    <span className={styles.chevron}>
                                        <Icon name="chevron" />
                                    </span>
                                </summary>
                                <TripPreview
                                    step={step}
                                    photo={photo}
                                    placeName={placeName}
                                    whenLabel={whenLabel}
                                    nights={form.nights}
                                    travellers={travellerLine(form, false)}
                                    travellersDetailed={travellerLine(form, true)}
                                    departure={form.departureCity}
                                    stayLine={stayLine}
                                    activities={selectedActivities}
                                    transfers={yesNo(form.requestTransfers, transfersIncluded)}
                                    flights={yesNo(form.flightsRequired, flightsIncluded)}
                                    budgetLabel={budgetLabel}
                                    embedded
                                />
                            </details>

                            {notice ? (
                                <p className={styles.notice} role="status">
                                    {notice}
                                </p>
                            ) : null}

                            {step === 1 && (
                                <fieldset className={styles.group}>
                                    <legend className={styles.srOnly}>Trip details</legend>
                                    <div className={styles.split}>
                                        <ControlField
                                            id="destinationId"
                                            label="Destination"
                                            icon="pin"
                                            error={errors.destinationId}
                                        >
                                            <Select
                                                id="destinationId"
                                                plain
                                                labelledBy="destinationId-label"
                                                placeholder="Select destination"
                                                value={form.destinationId}
                                                invalid={Boolean(errors.destinationId)}
                                                describedBy={described('destinationId')}
                                                options={destinations.map((item) => ({
                                                    value: item.id,
                                                    label: item.name,
                                                }))}
                                                onChange={changeDestination}
                                            />
                                        </ControlField>
                                        <ControlField
                                            id="departureCity"
                                            label="Departure city"
                                            icon="plane"
                                            error={errors.departureCity}
                                        >
                                            <Select
                                                id="departureCity"
                                                plain
                                                labelledBy="departureCity-label"
                                                placeholder="Select city"
                                                value={form.departureCity}
                                                invalid={Boolean(errors.departureCity)}
                                                describedBy={described('departureCity')}
                                                options={departureOptions}
                                                onChange={(departureCity) =>
                                                    mark({ departureCity })
                                                }
                                            />
                                        </ControlField>
                                    </div>
                                    {form.destinationId && destinationPackages.length === 0 ? (
                                        <p className={styles.hint}>
                                            No packages are listed for this destination yet. You can
                                            still send a preference.
                                        </p>
                                    ) : null}

                                    <p className={styles.sectionLabel}>Travel dates</p>
                                    <div
                                        className={styles.choiceGrid}
                                        role="radiogroup"
                                        aria-label="Travel dates"
                                    >
                                        <button
                                            type="button"
                                            className={`${styles.choice} ${
                                                form.flexible ? '' : styles.choiceOn
                                            }`}
                                            role="radio"
                                            aria-checked={!form.flexible}
                                            onClick={() => mark({ flexible: false })}
                                        >
                                            <span className={styles.radioDot} />
                                            Exact dates
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.choice} ${
                                                form.flexible ? styles.choiceOn : ''
                                            }`}
                                            role="radio"
                                            aria-checked={form.flexible}
                                            onClick={() => mark({ flexible: true })}
                                        >
                                            <span className={styles.radioDot} />
                                            I&apos;m flexible
                                        </button>
                                    </div>

                                    {form.flexible ? (
                                        <div className={styles.split}>
                                            <ControlField
                                                id="flexibleMonth"
                                                label="Preferred month"
                                                error={errors.flexibleMonth}
                                            >
                                                <Select
                                                    id="flexibleMonth"
                                                    plain
                                                    labelledBy="flexibleMonth-label"
                                                    placeholder="Select a month"
                                                    value={form.flexibleMonth}
                                                    invalid={Boolean(errors.flexibleMonth)}
                                                    describedBy={described('flexibleMonth')}
                                                    options={months.map((item) => ({
                                                        value: item.value,
                                                        label: item.label,
                                                    }))}
                                                    onChange={(flexibleMonth) =>
                                                        mark({ flexibleMonth })
                                                    }
                                                />
                                            </ControlField>
                                            <ControlField
                                                id="nights"
                                                label="Nights"
                                                error={errors.nights}
                                            >
                                                <input
                                                    id="nights"
                                                    inputMode="numeric"
                                                    value={form.nights}
                                                    aria-invalid={Boolean(errors.nights)}
                                                    aria-describedby={described('nights')}
                                                    onChange={(event) =>
                                                        changeNights(
                                                            event.target.value.replace(
                                                                /[^\d]/g,
                                                                '',
                                                            ),
                                                        )
                                                    }
                                                />
                                            </ControlField>
                                        </div>
                                    ) : (
                                        <div className={styles.dateGrid}>
                                            <ControlField
                                                id="startDate"
                                                label="Depart on"
                                                icon="calendar"
                                                date
                                                error={errors.startDate}
                                            >
                                                <DatePicker
                                                    id="startDate"
                                                    plain
                                                    labelledBy="startDate-label"
                                                    placeholder="Select date"
                                                    value={form.startDate}
                                                    invalid={Boolean(errors.startDate)}
                                                    describedBy={described('startDate')}
                                                    onChange={changeStart}
                                                />
                                            </ControlField>
                                            <ControlField
                                                id="endDate"
                                                label="Return on"
                                                icon="calendar"
                                                date
                                                error={errors.endDate}
                                            >
                                                <DatePicker
                                                    id="endDate"
                                                    plain
                                                    labelledBy="endDate-label"
                                                    placeholder="Select date"
                                                    value={form.endDate}
                                                    invalid={Boolean(errors.endDate)}
                                                    describedBy={described('endDate')}
                                                    onChange={changeEnd}
                                                />
                                            </ControlField>
                                            <div
                                                className={`${styles.field} ${styles.nightsField}`}
                                            >
                                                <span
                                                    className={styles.fieldLabel}
                                                    aria-hidden="true"
                                                >
                                                    Nights
                                                </span>
                                                <button
                                                    id="nights"
                                                    type="button"
                                                    className={styles.nightsPill}
                                                    tabIndex={-1}
                                                >
                                                    <Icon name="moon" />
                                                    {form.nights
                                                        ? `${form.nights} night${
                                                              form.nights === '1' ? '' : 's'
                                                          }`
                                                        : 'Nights'}
                                                </button>
                                                <FieldError id="nights" message={errors.nights} />
                                            </div>
                                        </div>
                                    )}

                                    <p className={styles.sectionLabel}>Travellers</p>
                                    <div className={styles.travellers}>
                                        <Counter
                                            id="adults"
                                            label="Adults"
                                            hint="Aged 12 years and above"
                                            value={form.adults}
                                            min={1}
                                            disablePlus={form.adults + form.children >= PARTY_LIMIT}
                                            onChange={(adults) => mark({ adults })}
                                        />
                                        <FieldError id="adults" message={errors.adults} />
                                        <div className={styles.childBlock}>
                                            <Counter
                                                id="children"
                                                label="Children"
                                                hint="Aged below 12 years"
                                                value={form.children}
                                                min={0}
                                                disablePlus={
                                                    form.adults + form.children >= PARTY_LIMIT
                                                }
                                                onChange={changeChildren}
                                            />
                                            {form.children > 0 && (
                                                <div className={styles.childAges}>
                                                    {form.childAges
                                                        .map((age, index) => ({
                                                            age,
                                                            fieldId: `childAge-${index}`,
                                                            rowKey: `child-row-${index + 1}`,
                                                            slot: index,
                                                            label:
                                                                form.children === 1
                                                                    ? 'Child age'
                                                                    : `Child ${index + 1} age`,
                                                        }))
                                                        .map((row) => (
                                                            <label
                                                                key={row.rowKey}
                                                                className={styles.field}
                                                                htmlFor={row.fieldId}
                                                            >
                                                                <span className={styles.fieldLabel}>
                                                                    {row.label}
                                                                </span>
                                                                <div
                                                                    className={`${styles.control} ${
                                                                        errors[row.fieldId]
                                                                            ? styles.controlInvalid
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    <select
                                                                        id={row.fieldId}
                                                                        value={row.age}
                                                                        aria-invalid={Boolean(
                                                                            errors[row.fieldId],
                                                                        )}
                                                                        aria-describedby={
                                                                            errors[row.fieldId]
                                                                                ? `${row.fieldId}-error`
                                                                                : undefined
                                                                        }
                                                                        onChange={(event) => {
                                                                            const childAges = [
                                                                                ...form.childAges,
                                                                            ];
                                                                            childAges[row.slot] =
                                                                                event.target.value;
                                                                            mark({ childAges });
                                                                        }}
                                                                    >
                                                                        <option value="">
                                                                            Select
                                                                        </option>
                                                                        {CHILD_AGES.map(
                                                                            (option) => (
                                                                                <option
                                                                                    key={
                                                                                        option.value
                                                                                    }
                                                                                    value={
                                                                                        option.value
                                                                                    }
                                                                                >
                                                                                    {option.label}
                                                                                </option>
                                                                            ),
                                                                        )}
                                                                    </select>
                                                                    <Icon name="chevron" />
                                                                </div>
                                                                <FieldError
                                                                    id={row.fieldId}
                                                                    message={errors[row.fieldId]}
                                                                />
                                                            </label>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </fieldset>
                            )}

                            {step === 2 && (
                                <fieldset className={styles.group}>
                                    <legend className={styles.srOnly}>Personalize your trip</legend>
                                    <p className={styles.sectionLabel} id="hotelCategory-label">
                                        Hotel category
                                    </p>
                                    <div
                                        className={styles.hotelGrid}
                                        role="group"
                                        aria-labelledby="hotelCategory-label"
                                    >
                                        {HOTEL_CATEGORIES.map((star, index) => (
                                            <button
                                                key={star}
                                                id={index === 0 ? 'hotelCategory' : undefined}
                                                type="button"
                                                className={`${styles.hotel} ${
                                                    form.hotelCategory === star
                                                        ? styles.hotelOn
                                                        : ''
                                                }`}
                                                aria-pressed={form.hotelCategory === star}
                                                onClick={() => mark({ hotelCategory: star })}
                                            >
                                                <Icon name="bed" />
                                                {`${star}-star`}
                                                <span className={styles.radioDot} />
                                            </button>
                                        ))}
                                    </div>
                                    <FieldError id="hotelCategory" message={errors.hotelCategory} />

                                    <div className={styles.traveller}>
                                        <strong id="rooms-label">Number of rooms</strong>
                                        <div className={styles.counter}>
                                            <button
                                                id="rooms"
                                                type="button"
                                                aria-label="Fewer rooms"
                                                onClick={() =>
                                                    mark({
                                                        rooms: String(Math.max(1, roomCount - 1)),
                                                    })
                                                }
                                                disabled={roomCount <= 1}
                                            >
                                                <Icon name="minus" />
                                            </button>
                                            <span aria-live="polite">{roomCount}</span>
                                            <button
                                                type="button"
                                                aria-label="More rooms"
                                                onClick={() =>
                                                    mark({
                                                        rooms: String(
                                                            Math.min(PARTY_LIMIT, roomCount + 1),
                                                        ),
                                                    })
                                                }
                                                disabled={roomCount >= PARTY_LIMIT}
                                            >
                                                <Icon name="plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <FieldError id="rooms" message={errors.rooms} />

                                    <div className={styles.activityHead}>
                                        <p className={styles.sectionLabel}>Activities</p>
                                        {form.activityKeys.length > 0 ? (
                                            <button
                                                type="button"
                                                className={styles.clearActivities}
                                                onClick={() => mark({ activityKeys: [] })}
                                            >
                                                Clear
                                            </button>
                                        ) : null}
                                    </div>
                                    <label className={styles.activitySearch} htmlFor="activity-search">
                                        <span className={styles.srOnly}>Search activities</span>
                                        <span className={styles.control}>
                                            <Icon name="search" />
                                            <input
                                                id="activity-search"
                                                type="search"
                                                value={activityQuery}
                                                placeholder="Search all activities"
                                                onChange={(event) => {
                                                    setActivityQuery(event.target.value);
                                                    setShowAllActivities(false);
                                                }}
                                            />
                                        </span>
                                    </label>
                                    {activities.length === 0 ? (
                                        <p className={styles.hint}>
                                            No activities are listed for this selection yet.
                                        </p>
                                    ) : (
                                        <div
                                            className={`${styles.activityGrid} ${
                                                visibleActivities.length > 12
                                                    ? styles.activityGridScroll
                                                    : ''
                                            }`}
                                        >
                                            {visibleActivities.length === 0 ? (
                                                <p className={styles.hint}>
                                                    No activities match that search.
                                                </p>
                                            ) : null}
                                            {visibleActivities.map((item) => {
                                                const selected = form.activityKeys.includes(
                                                    item.key,
                                                );
                                                return (
                                                    <button
                                                        key={item.key}
                                                        type="button"
                                                        className={`${styles.activity} ${
                                                            selected ? styles.activityOn : ''
                                                        }`}
                                                        aria-pressed={selected}
                                                        onClick={() =>
                                                            mark({
                                                                activityKeys: selected
                                                                    ? form.activityKeys.filter(
                                                                          (key) => key !== item.key,
                                                                      )
                                                                    : [
                                                                          ...form.activityKeys,
                                                                          item.key,
                                                                      ],
                                                            })
                                                        }
                                                    >
                                                        <Icon name={activityIcon(item.name)} />
                                                        <span className={styles.activityName}>
                                                            {item.name}
                                                            {item.included ? (
                                                                <span className={styles.included}>
                                                                    Included
                                                                </span>
                                                            ) : null}
                                                        </span>
                                                        <span className={styles.tick}>
                                                            <Icon name="check" />
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {hiddenActivityCount > 0 ? (
                                        <button
                                            type="button"
                                            className={styles.showActivities}
                                            onClick={() => setShowAllActivities(true)}
                                        >
                                            {`Show all ${activityMatches.length} activities`}
                                        </button>
                                    ) : null}
                                    <p className={styles.hint}>{activityNote}</p>

                                    <div className={styles.pair}>
                                        <div className={styles.field}>
                                            <span
                                                className={styles.fieldLabel}
                                                id="transfers-label"
                                            >
                                                Airport transfers
                                            </span>
                                            <div
                                                className={styles.segment}
                                                role="group"
                                                aria-labelledby="transfers-label"
                                            >
                                                <button
                                                    type="button"
                                                    className={
                                                        form.requestTransfers
                                                            ? styles.segmentOn
                                                            : ''
                                                    }
                                                    aria-pressed={form.requestTransfers}
                                                    onClick={() => mark({ requestTransfers: true })}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    type="button"
                                                    className={
                                                        form.requestTransfers
                                                            ? ''
                                                            : styles.segmentOn
                                                    }
                                                    aria-pressed={!form.requestTransfers}
                                                    onClick={() =>
                                                        mark({ requestTransfers: false })
                                                    }
                                                >
                                                    No
                                                </button>
                                            </div>
                                            {transfersIncluded ? (
                                                <p className={styles.hint}>
                                                    Included on this package.
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className={styles.field}>
                                            <span
                                                className={styles.fieldLabel}
                                                id="flightsRequired-label"
                                            >
                                                Request flights
                                            </span>
                                            <div
                                                className={`${styles.segment} ${
                                                    errors.flightsRequired
                                                        ? styles.segmentInvalid
                                                        : ''
                                                }`}
                                                role="group"
                                                aria-labelledby="flightsRequired-label"
                                            >
                                                <button
                                                    id="flightsRequired"
                                                    type="button"
                                                    className={
                                                        form.flightsRequired === true
                                                            ? styles.segmentOn
                                                            : ''
                                                    }
                                                    aria-pressed={form.flightsRequired === true}
                                                    onClick={() => mark({ flightsRequired: true })}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    type="button"
                                                    className={
                                                        form.flightsRequired === false
                                                            ? styles.segmentOn
                                                            : ''
                                                    }
                                                    aria-pressed={form.flightsRequired === false}
                                                    onClick={() => mark({ flightsRequired: false })}
                                                >
                                                    No
                                                </button>
                                            </div>
                                            <FieldError
                                                id="flightsRequired"
                                                message={errors.flightsRequired}
                                            />
                                            {flightsIncluded ? (
                                                <p className={styles.hint}>
                                                    Flights are included on this package.
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className={styles.field}>
                                        <span className={styles.fieldLabel} id="budget-label">
                                            Budget
                                        </span>
                                        <div className={styles.budgetLine}>
                                            <div className={styles.control}>
                                                <Select
                                                    id="budgetCurrency"
                                                    plain
                                                    labelledBy="budget-label"
                                                    value={budgetCurrency}
                                                    options={currencyOptions}
                                                    onChange={(value) => {
                                                        currencyTouched.current = true;
                                                        setBudgetCurrency(value);
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className={`${styles.segment} ${styles.segmentWide}`}
                                                role="group"
                                                aria-label="Budget basis"
                                            >
                                                <button
                                                    type="button"
                                                    className={
                                                        form.budgetBasis === 'per-person'
                                                            ? styles.segmentOn
                                                            : ''
                                                    }
                                                    aria-pressed={form.budgetBasis === 'per-person'}
                                                    onClick={() =>
                                                        mark({ budgetBasis: 'per-person' })
                                                    }
                                                >
                                                    Per person
                                                </button>
                                                <button
                                                    type="button"
                                                    className={
                                                        form.budgetBasis === 'total'
                                                            ? styles.segmentOn
                                                            : ''
                                                    }
                                                    aria-pressed={form.budgetBasis === 'total'}
                                                    onClick={() => mark({ budgetBasis: 'total' })}
                                                >
                                                    Total trip
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.split}>
                                            <label className={styles.field} htmlFor="budgetMin">
                                                <span className={styles.fieldLabel}>Min</span>
                                                <div
                                                    className={`${styles.control} ${
                                                        errors.budgetMin
                                                            ? styles.controlInvalid
                                                            : ''
                                                    }`}
                                                >
                                                    <input
                                                        id="budgetMin"
                                                        inputMode="decimal"
                                                        placeholder="Optional"
                                                        value={form.budgetMin}
                                                        aria-invalid={Boolean(errors.budgetMin)}
                                                        aria-describedby={described('budgetMin')}
                                                        onChange={(event) =>
                                                            mark({
                                                                budgetMin:
                                                                    event.target.value.replace(
                                                                        /[^\d]/g,
                                                                        '',
                                                                    ),
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <FieldError
                                                    id="budgetMin"
                                                    message={errors.budgetMin}
                                                />
                                            </label>
                                            <label className={styles.field} htmlFor="budgetMax">
                                                <span className={styles.fieldLabel}>Max</span>
                                                <div
                                                    className={`${styles.control} ${
                                                        errors.budgetMax
                                                            ? styles.controlInvalid
                                                            : ''
                                                    }`}
                                                >
                                                    <input
                                                        id="budgetMax"
                                                        inputMode="decimal"
                                                        placeholder="Optional"
                                                        value={form.budgetMax}
                                                        aria-invalid={Boolean(errors.budgetMax)}
                                                        aria-describedby={described('budgetMax')}
                                                        onChange={(event) =>
                                                            mark({
                                                                budgetMax:
                                                                    event.target.value.replace(
                                                                        /[^\d]/g,
                                                                        '',
                                                                    ),
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <FieldError
                                                    id="budgetMax"
                                                    message={errors.budgetMax}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <label className={styles.field} htmlFor="specialRequests">
                                        <span className={styles.fieldLabel}>Special requests</span>
                                        <textarea
                                            id="specialRequests"
                                            className={styles.textarea}
                                            rows={4}
                                            placeholder="Family-friendly activities, dietary needs, celebrations"
                                            value={form.specialRequests}
                                            onChange={(event) =>
                                                mark({ specialRequests: event.target.value })
                                            }
                                        />
                                    </label>
                                </fieldset>
                            )}

                            {step === 3 && (
                                <fieldset className={styles.group}>
                                    <legend className={styles.srOnly}>Your contact details</legend>
                                    <ControlField
                                        id="fullName"
                                        label="Full name"
                                        error={errors.fullName}
                                    >
                                        <input
                                            id="fullName"
                                            autoComplete="name"
                                            value={form.fullName}
                                            aria-invalid={Boolean(errors.fullName)}
                                            aria-describedby={described('fullName')}
                                            onChange={(event) =>
                                                mark({ fullName: event.target.value })
                                            }
                                        />
                                    </ControlField>
                                    <ControlField id="email" label="Email" error={errors.email}>
                                        <input
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            value={form.email}
                                            aria-invalid={Boolean(errors.email)}
                                            aria-describedby={described('email')}
                                            onChange={(event) =>
                                                mark({ email: event.target.value })
                                            }
                                        />
                                    </ControlField>
                                    <div className={styles.phoneRow}>
                                        <ControlField id="countryCode" label="Code">
                                            <Select
                                                id="countryCode"
                                                plain
                                                labelledBy="countryCode-label"
                                                value={form.countryCode}
                                                options={COUNTRY_CODES.map((code) => ({
                                                    value: code,
                                                    label: code,
                                                }))}
                                                onChange={(countryCode) => mark({ countryCode })}
                                            />
                                        </ControlField>
                                        <ControlField id="phone" label="Phone" error={errors.phone}>
                                            <input
                                                id="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                value={form.phone}
                                                aria-invalid={Boolean(errors.phone)}
                                                aria-describedby={described('phone')}
                                                onChange={(event) =>
                                                    mark({ phone: event.target.value })
                                                }
                                            />
                                        </ControlField>
                                    </div>
                                    <div className={styles.field}>
                                        <span
                                            className={styles.fieldLabel}
                                            id="contactMethod-label"
                                        >
                                            Preferred contact method
                                        </span>
                                        <div
                                            className={styles.choiceGrid}
                                            role="group"
                                            aria-labelledby="contactMethod-label"
                                        >
                                            {(['email', 'phone'] as const).map((method) => (
                                                <button
                                                    key={method}
                                                    id={
                                                        method === 'email'
                                                            ? 'contactMethod'
                                                            : undefined
                                                    }
                                                    type="button"
                                                    className={`${styles.choice} ${
                                                        form.contactMethod === method
                                                            ? styles.choiceOn
                                                            : ''
                                                    }`}
                                                    aria-pressed={form.contactMethod === method}
                                                    onClick={() => mark({ contactMethod: method })}
                                                >
                                                    <span className={styles.radioDot} />
                                                    {method === 'email' ? 'Email' : 'Phone'}
                                                </button>
                                            ))}
                                        </div>
                                        <FieldError
                                            id="contactMethod"
                                            message={errors.contactMethod}
                                        />
                                    </div>
                                    {submitError ? (
                                        <p className={styles.submitError} role="alert">
                                            {submitError}
                                        </p>
                                    ) : null}
                                    <p className={styles.hint}>
                                        No payment now. The team reviews your preferences and shares
                                        a quote.
                                    </p>
                                </fieldset>
                            )}
                        </div>
                        <aside className={styles.summaryDesktop} aria-label="Trip summary">
                            {preview}
                        </aside>
                    </div>
                </div>

                <div className={styles.footer}>
                    {step > 1 ? (
                        <button
                            type="button"
                            className={styles.back}
                            onClick={() => goToStep((step - 1) as 1 | 2)}
                        >
                            <Icon name="arrowLeft" />
                            Back
                        </button>
                    ) : (
                        <p className={styles.assurance}>
                            <Icon name="shield" />
                            No payment required
                        </p>
                    )}
                    {step < 3 ? (
                        <button type="button" className={styles.primary} onClick={continueStep}>
                            Continue
                            <Icon name="arrowRight" />
                        </button>
                    ) : (
                        <button type="submit" className={styles.primary} disabled={submitting}>
                            {submitting ? 'Sending your request…' : 'Request my custom quote'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CustomizePackage;
