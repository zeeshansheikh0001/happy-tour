import { PARTY_LIMIT, COUNTRY_CODES } from '../customize/model';
import { EnquirySubmitResult } from '../customize/submitEnquiry';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ActivityBookingDraft {
    date: string;
    adults: number;
    children: number;
    fullName: string;
    email: string;
    countryCode: string;
    phone: string;
}

export interface ActivityBookingPayload {
    kind: 'activity-booking';
    activityId: string;
    activityTitle: string;
    place: string;
    date: string;
    adults: number;
    children: number;
    fullName: string;
    email: string;
    phone: string;
}

export const emptyActivityBooking = (): ActivityBookingDraft => ({
    date: '',
    adults: 1,
    children: 0,
    fullName: '',
    email: '',
    countryCode: COUNTRY_CODES[0],
    phone: '',
});

const isPastDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    const chosen = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return chosen < today;
};

export function validateActivityBooking(draft: ActivityBookingDraft): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) errors.date = 'Choose a date.';
    else if (isPastDate(draft.date)) errors.date = 'Choose a date from today onward.';
    if (!Number.isInteger(draft.adults) || draft.adults < 1) errors.adults = 'Add at least 1 adult.';
    if (!Number.isInteger(draft.children) || draft.children < 0) {
        errors.children = 'Enter a valid number of children.';
    }
    if (draft.adults + draft.children > PARTY_LIMIT) {
        errors.adults = `A booking can include up to ${PARTY_LIMIT} travellers.`;
    }
    if (draft.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
    if (!EMAIL.test(draft.email.trim())) errors.email = 'Enter a valid email address.';
    if (draft.phone.replace(/\D/g, '').length < 6) errors.phone = 'Enter a phone number.';
    return errors;
}

export function toActivityBookingPayload(
    draft: ActivityBookingDraft,
    activity: { id: string; title: string; place: string },
): ActivityBookingPayload {
    return {
        kind: 'activity-booking',
        activityId: activity.id,
        activityTitle: activity.title,
        place: activity.place,
        date: draft.date,
        adults: draft.adults,
        children: draft.children,
        fullName: draft.fullName.trim(),
        email: draft.email.trim(),
        phone: `${draft.countryCode} ${draft.phone.trim()}`,
    };
}

/**
 * POST {NEXT_PUBLIC_BOOKING_API_URL}, or {NEXT_PUBLIC_ENQUIRY_API_URL} when the
 * booking URL is unset.
 * Body: ActivityBookingPayload
 * Success only means the request was received. This form does not take payment.
 */
export async function submitActivityBooking(
    payload: ActivityBookingPayload,
): Promise<EnquirySubmitResult> {
    const url = process.env.NEXT_PUBLIC_BOOKING_API_URL || process.env.NEXT_PUBLIC_ENQUIRY_API_URL;
    if (!url) {
        return {
            ok: false,
            error: 'unconfigured',
            message: 'The booking service is not connected yet. Your details are still in this form.',
        };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
        });
        const body = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
        if (!response.ok || body?.ok === false) {
            return {
                ok: false,
                error: 'rejected',
                message: body?.message || 'The booking was not accepted. You can try again.',
            };
        }
        return { ok: true };
    } catch {
        return {
            ok: false,
            error: 'network',
            message: 'We could not reach the booking service. Your details are still in this form.',
        };
    }
}
