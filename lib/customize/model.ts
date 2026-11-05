import { uaeActivities } from '../../data/uaeActivities';
import { activities, holidayDestinations, tours } from '../../data/staticData';
import { TourPackage } from '../../types/staticData';
import { createSlug } from '../../utils/slug';

/** Same party cap as the homepage trip planner. */
export const PARTY_LIMIT = 10;

export type EnquirySource = 'package-card' | 'package-detail' | 'plan-trip';

export type BudgetBasis = 'per-person' | 'total';

export type ContactMethod = 'email' | 'phone';

export interface CustomizeFormState {
    destinationId: string;
    packageId: number | null;
    departureCity: string;
    flexible: boolean;
    startDate: string;
    endDate: string;
    flexibleMonth: string;
    nights: string;
    adults: number;
    children: number;
    childAges: string[];
    hotelCategory: number | null;
    rooms: string;
    activityKeys: string[];
    requestTransfers: boolean;
    flightsRequired: boolean | null;
    budgetMin: string;
    budgetMax: string;
    budgetBasis: BudgetBasis;
    specialRequests: string;
    fullName: string;
    email: string;
    countryCode: string;
    phone: string;
    contactMethod: ContactMethod | '';
}

export interface ActivityOption {
    key: string;
    name: string;
    included: boolean;
    duration: string;
}

export interface DestinationOption {
    id: string;
    name: string;
}

export const COUNTRY_CODES = ['+91', '+1', '+44', '+61', '+971'] as const;

const PLACE_TO_DESTINATION: Record<string, string> = {
    dubai: 'dubai',
    hanoi: 'vietnam',
    'halong bay': 'vietnam',
    'hoi an': 'vietnam',
    vietnam: 'vietnam',
    ladakh: 'ladakh',
    kashmir: 'kashmir',
    'north east india': 'north-east-india',
    'northeast india': 'north-east-india',
};

export const emptyForm = (): CustomizeFormState => ({
    destinationId: '',
    packageId: null,
    departureCity: '',
    flexible: false,
    startDate: '',
    endDate: '',
    flexibleMonth: '',
    nights: '',
    adults: 1,
    children: 0,
    childAges: [],
    hotelCategory: null,
    rooms: '1',
    activityKeys: [],
    requestTransfers: false,
    flightsRequired: null,
    budgetMin: '',
    budgetMax: '',
    budgetBasis: 'per-person',
    specialRequests: '',
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    contactMethod: '',
});

export function findPackage(packageQuery?: string, idQuery?: string): TourPackage | null {
    if (idQuery) {
        const id = Number(idQuery);
        const byId = tours.find((tour) => tour.id === id);
        if (byId) return byId;
    }
    if (packageQuery) {
        return tours.find((tour) => createSlug(tour.title) === packageQuery) ?? null;
    }
    return null;
}

export function destinationIdForTour(tour: TourPackage): string {
    for (const location of tour.locations) {
        const match = PLACE_TO_DESTINATION[location.place.toLowerCase()];
        if (match) return match;
    }
    return '';
}

export function packagesForDestination(destinationId: string): TourPackage[] {
    if (!destinationId) return [];
    return tours.filter((tour) => destinationIdForTour(tour) === destinationId);
}

export function destinationOptions(): DestinationOption[] {
    return holidayDestinations.map((item) => ({ id: item.id, name: item.name }));
}

export function destinationName(destinationId: string): string {
    return destinationOptions().find((item) => item.id === destinationId)?.name ?? '';
}

export function nightsFromDuration(duration: string): number {
    const nights = duration.match(/(\d+)\s*nights?/i);
    if (nights) return Number(nights[1]);
    const days = duration.match(/(\d+)\s*days?/i);
    if (days) return Math.max(1, Number(days[1]) - 1);
    return 1;
}

export function flightsConfirmed(tour: TourPackage | null): boolean {
    if (!tour) return false;
    if ((tour.flights?.length ?? 0) > 0) return true;
    return (tour.inclusions ?? []).some((item) => /flight/i.test(item));
}

export function transfersConfirmed(tour: TourPackage | null): boolean {
    return (tour?.transfers ?? []).some((transfer) => transfer.included);
}

export function hotelStarsFor(scope: TourPackage[]): number[] {
    const stars = new Set<number>();
    scope.forEach((tour) => {
        tour.stay?.forEach((stay) => {
            const rating = Math.round(stay.rating);
            if (rating >= 1 && rating <= 5) stars.add(rating);
        });
    });
    return [...stars].sort((a, b) => a - b);
}

export function activityOptionsFor(scope: TourPackage[]): ActivityOption[] {
    const options: ActivityOption[] = [];
    scope.forEach((tour) => {
        tour.activities?.forEach((activity) => {
            options.push({
                key: `${tour.id}:${activity.id}`,
                name: activity.name,
                included: activity.included,
                duration: activity.duration,
            });
        });
    });
    return options;
}

function pushActivity(
    options: ActivityOption[],
    seen: Set<string>,
    key: string,
    name: string,
    included: boolean,
    duration: string,
) {
    const label = name.trim();
    const id = label.toLowerCase();
    if (!label || seen.has(id)) return;
    seen.add(id);
    options.push({ key, name: label, included, duration });
}

export function activityChoicesFor(destinationId: string, packageId: number | null): ActivityOption[] {
    const packages = packagesForDestination(destinationId);
    const active = packageId == null ? null : packages.find((item) => item.id === packageId) ?? null;
    const includedNames = new Set(
        (active?.activities ?? [])
            .filter((activity) => activity.included)
            .map((activity) => activity.name.trim().toLowerCase()),
    );
    const options: ActivityOption[] = [];
    const seen = new Set<string>();

    packages.forEach((tour) => {
        tour.activities?.forEach((activity) => {
            pushActivity(
                options,
                seen,
                `${tour.id}:${activity.id}`,
                activity.name,
                includedNames.has(activity.name.trim().toLowerCase()),
                activity.duration,
            );
        });
    });

    if (destinationId === 'dubai') {
        const titles = new Map<string, number>();
        uaeActivities.forEach((activity) => {
            const title = activity.title.trim().toLowerCase();
            titles.set(title, (titles.get(title) ?? 0) + 1);
        });
        uaeActivities.forEach((activity) => {
            const shared = (titles.get(activity.title.trim().toLowerCase()) ?? 0) > 1;
            const name = shared ? `${activity.title} · ${activity.emirate}` : activity.title;
            pushActivity(options, seen, `uae:${activity.id}`, name, false, activity.emirate);
        });
        return options;
    }

    const place = destinationName(destinationId).toLowerCase();
    activities.forEach((activity) => {
        const location = activity.location.toLowerCase();
        const matches =
            (place && location.includes(place)) ||
            (destinationId === 'vietnam' && /vietnam|hanoi|halong|hoi an/.test(location));
        if (!matches) return;
        pushActivity(options, seen, `activity:${activity.id}`, activity.title, false, activity.duration);
    });
    return options;
}

export function scopeFor(destinationId: string, packageId: number | null): TourPackage[] {
    if (packageId != null) {
        const tour = tours.find((item) => item.id === packageId);
        return tour ? [tour] : [];
    }
    return packagesForDestination(destinationId);
}

export function prefillFromPackage(tour: TourPackage): CustomizeFormState {
    const form = emptyForm();
    form.destinationId = destinationIdForTour(tour);
    form.packageId = tour.id;
    form.nights = String(nightsFromDuration(tour.duration));
    const stars = hotelStarsFor([tour]);
    form.hotelCategory = stars.length === 1 ? stars[0] : null;
    form.requestTransfers = transfersConfirmed(tour);
    form.flightsRequired = flightsConfirmed(tour) ? true : null;
    return form;
}

export function todayISO(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

export function addNights(start: string, nights: number): string {
    const date = new Date(`${start}T00:00:00`);
    date.setDate(date.getDate() + nights);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
}

export function nightsBetween(start: string, end: string): number | null {
    if (!start || !end) return null;
    const from = new Date(`${start}T00:00:00`).getTime();
    const to = new Date(`${end}T00:00:00`).getTime();
    const nights = Math.round((to - from) / 86400000);
    return nights > 0 ? nights : null;
}

export function upcomingMonths(count = 18): { value: string; label: string }[] {
    const now = new Date();
    return Array.from({ length: count }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() + index, 1);
        const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        return { value, label };
    });
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStep(
    step: 1 | 2 | 3,
    form: CustomizeFormState,
    stars: number[],
    flightsIncluded = false,
): Record<string, string> {
    const errors: Record<string, string> = {};

    if (step === 1) {
        if (!form.destinationId) errors.destinationId = 'Choose a destination.';
        if (form.departureCity.trim().length < 2)
            errors.departureCity = 'Enter the city you are leaving from.';
        const nights = Number(form.nights);
        if (!form.nights || !Number.isInteger(nights) || nights < 1) {
            errors.nights = 'Enter at least 1 night.';
        }
        if (form.flexible) {
            if (!form.flexibleMonth)
                errors.flexibleMonth = 'Choose the month you would like to travel.';
        } else {
            if (!form.startDate) errors.startDate = 'Choose a departure date.';
            if (!form.endDate) errors.endDate = 'Choose a return date.';
            if (form.startDate && form.startDate < todayISO())
                errors.startDate = 'Departure date cannot be in the past.';
            if (form.startDate && form.endDate) {
                const span = nightsBetween(form.startDate, form.endDate);
                if (!span) errors.endDate = 'Return date must be after the departure date.';
                else if (Number.isInteger(nights) && span !== nights) {
                    errors.nights = 'Nights should match the dates you selected.';
                }
            }
        }
        if (form.adults < 1) errors.adults = 'At least one adult is required.';
        if (form.adults + form.children > PARTY_LIMIT) {
            errors.adults = `This planner accepts up to ${PARTY_LIMIT} travellers.`;
        }
        form.childAges.forEach((age, index) => {
            if (age.trim() === '' || !Number.isInteger(Number(age)) || Number(age) < 0) {
                errors[`childAge-${index}`] = 'Enter this child’s age.';
            }
        });
    }

    if (step === 2) {
        if (stars.length > 0 && form.hotelCategory == null) {
            errors.hotelCategory = 'Choose a hotel category.';
        }
        const rooms = Number(form.rooms);
        if (!form.rooms || !Number.isInteger(rooms) || rooms < 1)
            errors.rooms = 'Enter at least 1 room.';
        else if (rooms > PARTY_LIMIT) errors.rooms = `Enter ${PARTY_LIMIT} rooms or fewer.`;
        if (!flightsIncluded && form.flightsRequired == null) {
            errors.flightsRequired = 'Tell us if you want flights requested.';
        }
        const minRaw = form.budgetMin.trim();
        const maxRaw = form.budgetMax.trim();
        if (minRaw !== '' || maxRaw !== '') {
            const min = Number(minRaw);
            const max = Number(maxRaw);
            if (minRaw === '' || Number.isNaN(min) || min < 0)
                errors.budgetMin = 'Enter a minimum budget.';
            if (maxRaw === '' || Number.isNaN(max) || max < 0)
                errors.budgetMax = 'Enter a maximum budget.';
            if (!errors.budgetMin && !errors.budgetMax && min > max) {
                errors.budgetMax = 'Maximum budget must be at least the minimum.';
            }
        }
    }

    if (step === 3) {
        if (form.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
        if (!EMAIL.test(form.email.trim())) errors.email = 'Enter a valid email address.';
        if (form.phone.replace(/\D/g, '').length < 6) errors.phone = 'Enter a phone number.';
        if (!form.contactMethod) errors.contactMethod = 'Choose how we should contact you.';
    }

    return errors;
}

export const FIELD_ORDER = [
    'destinationId',
    'departureCity',
    'startDate',
    'endDate',
    'flexibleMonth',
    'nights',
    'adults',
    'hotelCategory',
    'rooms',
    'flightsRequired',
    'budgetMin',
    'budgetMax',
    'fullName',
    'email',
    'phone',
    'contactMethod',
];

export function firstInvalidField(errors: Record<string, string>): string | undefined {
    const ordered = [
        ...FIELD_ORDER,
        ...Object.keys(errors).filter((key) => key.startsWith('childAge-')),
    ];
    return ordered.find((key) => errors[key]);
}

export interface CustomizeEnquiryPayload {
    source: EnquirySource;
    packageId: number | null;
    packageTitle: string | null;
    destinationId: string;
    destinationName: string;
    departureCity: string;
    flexible: boolean;
    startDate: string | null;
    endDate: string | null;
    flexibleMonth: string | null;
    nights: number;
    adults: number;
    children: number;
    childAges: number[];
    hotelCategory: number | null;
    rooms: number;
    requestedActivities: string[];
    includedActivities: string[];
    includedItems: string[];
    transfersIncluded: boolean;
    transfersRequested: boolean;
    flightsIncluded: boolean;
    flightsRequested: boolean;
    budgetMin: number;
    budgetMax: number;
    budgetCurrency: string;
    budgetBasis: BudgetBasis;
    specialRequests: string;
    fullName: string;
    email: string;
    phone: string;
    contactMethod: ContactMethod;
}

export function buildPayload(
    form: CustomizeFormState,
    source: EnquirySource,
    currencyCode: string,
    scope: TourPackage[],
    activities: ActivityOption[],
): CustomizeEnquiryPayload {
    const tour =
        form.packageId == null
            ? null
            : scope.find((item) => item.id === form.packageId) ??
              tours.find((item) => item.id === form.packageId) ??
              null;
    const requested = activities.filter((item) => form.activityKeys.includes(item.key));
    const includedActivities = activities.filter((item) => item.included);
    return {
        source,
        packageId: form.packageId,
        packageTitle: tour?.title ?? null,
        destinationId: form.destinationId,
        destinationName: destinationName(form.destinationId),
        departureCity: form.departureCity.trim(),
        flexible: form.flexible,
        startDate: form.flexible ? null : form.startDate,
        endDate: form.flexible ? null : form.endDate,
        flexibleMonth: form.flexible ? form.flexibleMonth : null,
        nights: Number(form.nights),
        adults: form.adults,
        children: form.children,
        childAges: form.childAges.map((age) => Number(age)),
        hotelCategory: form.hotelCategory,
        rooms: Number(form.rooms),
        requestedActivities: requested.map((item) => item.name),
        includedActivities: includedActivities.map((item) => item.name),
        includedItems: tour?.inclusions ?? [],
        transfersIncluded: transfersConfirmed(tour),
        transfersRequested: form.requestTransfers,
        flightsIncluded: flightsConfirmed(tour),
        flightsRequested: form.flightsRequired === true,
        budgetMin: Number(form.budgetMin),
        budgetMax: Number(form.budgetMax),
        budgetCurrency: currencyCode,
        budgetBasis: form.budgetBasis,
        specialRequests: form.specialRequests.trim(),
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: `${form.countryCode} ${form.phone.trim()}`,
        contactMethod: form.contactMethod as ContactMethod,
    };
}
