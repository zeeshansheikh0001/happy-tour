import React, { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import DatePicker from '../DatePicker';
import { COUNTRY_CODES, PARTY_LIMIT } from '../../lib/customize/model';
import {
    ActivityBookingDraft,
    emptyActivityBooking,
    submitActivityBooking,
    toActivityBookingPayload,
    validateActivityBooking,
} from '../../lib/booking/activityBooking';
import styles from './ActivityBooking.module.scss';

interface CountFieldProps {
    id: string;
    label: string;
    value: number;
    error?: string;
    onDecrease: () => void;
    onIncrease: () => void;
    decreaseDisabled: boolean;
    increaseDisabled: boolean;
}

const CountField: React.FC<CountFieldProps> = ({
    id,
    label,
    value,
    error,
    onDecrease,
    onIncrease,
    decreaseDisabled,
    increaseDisabled,
}) => (
    <div className={styles.field}>
        <span className={styles.label} id={`${id}-label`}>{label}</span>
        <div className={styles.stepper}>
            <button
                type="button"
                aria-label={`Fewer ${label.toLowerCase()}`}
                onClick={onDecrease}
                disabled={decreaseDisabled}
            >
                −
            </button>
            <span id={id} aria-labelledby={`${id}-label`}>{value}</span>
            <button
                type="button"
                aria-label={`More ${label.toLowerCase()}`}
                onClick={onIncrease}
                disabled={increaseDisabled}
            >
                +
            </button>
        </div>
        {error ? <p id={`${id}-error`} className={styles.error}>{error}</p> : null}
    </div>
);

interface ActivityBookingProps {
    open: boolean;
    onClose: () => void;
    activityId: string;
    title: string;
    place: string;
    image: string;
    priceLabel?: string;
}

const ActivityBooking: React.FC<ActivityBookingProps> = ({
    open,
    onClose,
    activityId,
    title,
    place,
    image,
    priceLabel,
}) => {
    const titleId = useId();
    const dateLabelId = useId();
    const [mounted, setMounted] = useState(false);
    const [draft, setDraft] = useState<ActivityBookingDraft>(emptyActivityBooking);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const submitLock = useRef(false);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) return undefined;
        setDraft(emptyActivityBooking());
        setErrors({});
        setSubmitError('');
        setSubmitting(false);
        setSucceeded(false);
        submitLock.current = false;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const focusId = window.setTimeout(() => {
            dialogRef.current?.querySelector<HTMLElement>('button, input, select')?.focus();
        }, 0);
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onCloseRef.current();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKeyDown);
            window.clearTimeout(focusId);
        };
    }, [open, activityId]);

    if (!mounted || !open) return null;

    const patch = (next: Partial<ActivityBookingDraft>) => {
        setDraft((current) => ({ ...current, ...next }));
    };

    const changeCount = (key: 'adults' | 'children', delta: number) => {
        const other = key === 'adults' ? draft.children : draft.adults;
        const minimum = key === 'adults' ? 1 : 0;
        const next = Math.min(PARTY_LIMIT - other, Math.max(minimum, draft[key] + delta));
        patch({ [key]: next });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (submitLock.current || submitting || succeeded) return;
        const nextErrors = validateActivityBooking(draft);
        setErrors(nextErrors);
        const firstInvalid = Object.keys(nextErrors)[0];
        if (firstInvalid) {
            dialogRef.current?.querySelector<HTMLElement>(`#booking-${firstInvalid}`)?.focus();
            return;
        }
        submitLock.current = true;
        setSubmitting(true);
        setSubmitError('');
        const result = await submitActivityBooking(
            toActivityBookingPayload(draft, { id: activityId, title, place }),
        );
        setSubmitting(false);
        if (result.ok) {
            setSucceeded(true);
            return;
        }
        submitLock.current = false;
        setSubmitError(result.message || 'The booking was not sent. You can try again.');
    };

    const described = (id: string) => (errors[id] ? `booking-${id}-error` : undefined);

    const dialog = (
        <div className={styles.overlay}>
            <button type="button" className={styles.backdrop} aria-label="Close booking" onClick={onClose} />
            <div
                ref={dialogRef}
                className={styles.dialog}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                <button type="button" className={styles.close} aria-label="Close booking" onClick={onClose}>
                    <FaTimes />
                </button>
                <div className={styles.activity}>
                    <div className={styles.photo}>
                        <Image src={image} alt="" fill sizes="72px" className={styles.photoImage} />
                    </div>
                    <div>
                        <p className={styles.place}>{place}</p>
                        <h2 id={titleId} className={styles.title}>{title}</h2>
                        {priceLabel ? <p className={styles.price}>{priceLabel}</p> : null}
                    </div>
                </div>

                {succeeded ? (
                    <div className={styles.success}>
                        <p className={styles.kicker}>Booking received</p>
                        <p>
                            Your date and party for {title} are with the team. They confirm
                            availability and send payment details. Nothing is charged on this form.
                        </p>
                        <button type="button" className={styles.submit} onClick={onClose}>
                            Close
                        </button>
                    </div>
                ) : (
                    <form className={styles.form} onSubmit={handleSubmit} noValidate>
                        <p className={styles.lead}>
                            Choose a date and who is travelling. Nothing is charged here.
                        </p>
                        <div className={styles.field}>
                            <span id={dateLabelId} className={styles.label}>Date</span>
                            <DatePicker
                                id="booking-date"
                                labelledBy={dateLabelId}
                                value={draft.date}
                                invalid={Boolean(errors.date)}
                                describedBy={described('date')}
                                onChange={(date) => patch({ date })}
                            />
                            {errors.date ? <p id="booking-date-error" className={styles.error}>{errors.date}</p> : null}
                        </div>
                        <div className={styles.counts}>
                            <CountField
                                id="booking-adults"
                                label="Adults"
                                value={draft.adults}
                                error={errors.adults}
                                onDecrease={() => changeCount('adults', -1)}
                                onIncrease={() => changeCount('adults', 1)}
                                decreaseDisabled={draft.adults <= 1}
                                increaseDisabled={draft.adults + draft.children >= PARTY_LIMIT}
                            />
                            <CountField
                                id="booking-children"
                                label="Children"
                                value={draft.children}
                                error={errors.children}
                                onDecrease={() => changeCount('children', -1)}
                                onIncrease={() => changeCount('children', 1)}
                                decreaseDisabled={draft.children <= 0}
                                increaseDisabled={draft.adults + draft.children >= PARTY_LIMIT}
                            />
                        </div>
                        <label className={styles.field} htmlFor="booking-fullName">
                            Full name
                            <input
                                id="booking-fullName"
                                className={styles.input}
                                value={draft.fullName}
                                autoComplete="name"
                                aria-invalid={Boolean(errors.fullName)}
                                aria-describedby={described('fullName')}
                                onChange={(event) => patch({ fullName: event.target.value })}
                            />
                            {errors.fullName ? (
                                <span id="booking-fullName-error" className={styles.error}>{errors.fullName}</span>
                            ) : null}
                        </label>
                        <label className={styles.field} htmlFor="booking-email">
                            Email
                            <input
                                id="booking-email"
                                type="email"
                                className={styles.input}
                                value={draft.email}
                                autoComplete="email"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={described('email')}
                                onChange={(event) => patch({ email: event.target.value })}
                            />
                            {errors.email ? (
                                <span id="booking-email-error" className={styles.error}>{errors.email}</span>
                            ) : null}
                        </label>
                        <div className={styles.field}>
                            <span className={styles.label} id="booking-phone-label">Phone</span>
                            <div className={styles.phone}>
                                <select
                                    aria-label="Country code"
                                    value={draft.countryCode}
                                    onChange={(event) => patch({ countryCode: event.target.value })}
                                >
                                    {COUNTRY_CODES.map((code) => (
                                        <option key={code} value={code}>{code}</option>
                                    ))}
                                </select>
                                <input
                                    id="booking-phone"
                                    type="tel"
                                    value={draft.phone}
                                    autoComplete="tel"
                                    aria-labelledby="booking-phone-label"
                                    aria-invalid={Boolean(errors.phone)}
                                    aria-describedby={described('phone')}
                                    onChange={(event) => patch({ phone: event.target.value })}
                                />
                            </div>
                            {errors.phone ? (
                                <p id="booking-phone-error" className={styles.error}>{errors.phone}</p>
                            ) : null}
                        </div>
                        {submitError ? <p className={styles.submitError} role="alert">{submitError}</p> : null}
                        <button type="submit" className={styles.submit} disabled={submitting}>
                            {submitting ? 'Sending…' : 'Book Now'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );

    return createPortal(dialog, document.body);
};

export default ActivityBooking;
