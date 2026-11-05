import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Icon3D from '../Icon3D';
import styles from './DatePicker.module.scss';

interface DatePickerProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    labelledBy: string;
    invalid?: boolean;
    describedBy?: string;
    placeholder?: string;
    compact?: boolean;
    plain?: boolean;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const pad = (value: number) => String(value).padStart(2, '0');

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const toISO = (date: Date) =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const parseISO = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        return null;
    }
    return startOfDay(date);
};

const formatDisplay = (value: string) => {
    const date = parseISO(value);
    if (!date) return '';
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const monthKey = (year: number, month: number) => year * 12 + month;

const DatePicker: React.FC<DatePickerProps> = ({
    id,
    value,
    onChange,
    labelledBy,
    invalid = false,
    describedBy,
    placeholder = 'Select a date',
    compact = false,
    plain = false,
}) => {
    const today = useMemo(() => startOfDay(new Date()), []);
    const minDate = today;
    const maxDate = useMemo(
        () => new Date(today.getFullYear() + 3, today.getMonth(), today.getDate()),
        [today],
    );
    const selected = parseISO(value);
    const selectedOrToday = selected ?? today;

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [sheet, setSheet] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [viewYear, setViewYear] = useState(selectedOrToday.getFullYear());
    const [viewMonth, setViewMonth] = useState(selectedOrToday.getMonth());

    const minKey = monthKey(minDate.getFullYear(), minDate.getMonth());
    const maxKey = monthKey(maxDate.getFullYear(), maxDate.getMonth());
    const viewKey = monthKey(viewYear, viewMonth);
    const canPrev = viewKey > minKey;
    const canNext = viewKey < maxKey;

    const cells = useMemo(() => {
        const first = new Date(viewYear, viewMonth, 1);
        const offset = (first.getDay() + 6) % 7;
        const days = new Date(viewYear, viewMonth + 1, 0).getDate();
        return Array.from({ length: offset + days }, (_, index) => {
            if (index < offset) return null;
            return new Date(viewYear, viewMonth, index - offset + 1);
        });
    }, [viewMonth, viewYear]);

    useEffect(() => {
        if (!open) return undefined;

        const next = parseISO(value) ?? today;
        setViewYear(next.getFullYear());
        setViewMonth(next.getMonth());

        const media = window.matchMedia('(max-width: 767px)');

        const place = () => {
            const isSheet = media.matches;
            setSheet(isSheet);
            const box = triggerRef.current?.getBoundingClientRect();
            if (!box) return;

            const width = 320;
            const height = panelRef.current?.offsetHeight ?? 360;
            let left = box.left;
            if (left + width > window.innerWidth - 16) {
                left = Math.max(16, window.innerWidth - width - 16);
            }
            let top = box.bottom + 8;
            if (top + height > window.innerHeight - 16) {
                top = Math.max(16, box.top - height - 8);
            }
            setCoords({ top, left });
        };

        place();
        const frame = window.requestAnimationFrame(place);

        const onPointerDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return;
            setOpen(false);
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };

        media.addEventListener('change', place);
        window.addEventListener('resize', place);
        window.addEventListener('scroll', place, true);
        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            window.cancelAnimationFrame(frame);
            media.removeEventListener('change', place);
            window.removeEventListener('resize', place);
            window.removeEventListener('scroll', place, true);
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open, today, value]);

    const shiftMonth = (delta: number) => {
        const next = new Date(viewYear, viewMonth + delta, 1);
        const nextKey = monthKey(next.getFullYear(), next.getMonth());
        if (nextKey < minKey || nextKey > maxKey) return;
        setViewYear(next.getFullYear());
        setViewMonth(next.getMonth());
    };

    const chooseDate = (date: Date) => {
        if (date < minDate || date > maxDate) return;
        onChange(toISO(date));
        setOpen(false);
        triggerRef.current?.focus();
    };

    const display = formatDisplay(value);

    return (
        <div className={styles.root} ref={rootRef}>
            <button
                id={id}
                ref={triggerRef}
                type="button"
                aria-describedby={describedBy}
                className={`${styles.trigger} ${compact ? styles.triggerCompact : ''} ${
                    plain ? styles.triggerPlain : ''
                } ${!display ? styles.triggerEmpty : ''} ${invalid ? styles.triggerInvalid : ''} ${
                    open ? styles.triggerOpen : ''
                }`}
                aria-labelledby={labelledBy}
                aria-label={display ? `Travel date, ${display}` : 'Select a travel date'}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-invalid={invalid}
                onClick={() => setOpen((current) => !current)}
            >
                <span>{display || placeholder}</span>
                {plain ? (
                    <FiChevronDown className={styles.chevron} />
                ) : (
                    <Icon3D name="calendar" alt="" size={20} />
                )}
            </button>

            {open &&
                typeof document !== 'undefined' &&
                createPortal(
                    <>
                        <button
                            type="button"
                            className={styles.backdrop}
                            aria-label="Close calendar"
                            onClick={() => setOpen(false)}
                        />
                        <div
                            ref={panelRef}
                            className={styles.panel}
                            role="dialog"
                            aria-label="Choose travel date"
                            style={sheet ? undefined : { top: coords.top, left: coords.left }}
                        >
                            <div className={styles.header}>
                                <button
                                    type="button"
                                    className={styles.nav}
                                    aria-label="Previous month"
                                    disabled={!canPrev}
                                    onClick={() => shiftMonth(-1)}
                                >
                                    <FiChevronLeft />
                                </button>
                                <p className={styles.month}>
                                    {MONTHS[viewMonth]} {viewYear}
                                </p>
                                <button
                                    type="button"
                                    className={styles.nav}
                                    aria-label="Next month"
                                    disabled={!canNext}
                                    onClick={() => shiftMonth(1)}
                                >
                                    <FiChevronRight />
                                </button>
                            </div>

                            <div className={styles.weekdays} aria-hidden="true">
                                {WEEKDAYS.map((day) => (
                                    <span key={day}>{day}</span>
                                ))}
                            </div>

                            <div
                                className={styles.grid}
                                role="grid"
                                aria-label={`${MONTHS[viewMonth]} ${viewYear}`}
                            >
                                {cells.map((date, index) => {
                                    if (!date) {
                                        return (
                                            <span key={`empty-${index}`} className={styles.empty} />
                                        );
                                    }

                                    const iso = toISO(date);
                                    const disabled = date < minDate || date > maxDate;
                                    const isSelected = value === iso;
                                    const isToday = toISO(today) === iso;

                                    return (
                                        <button
                                            key={iso}
                                            type="button"
                                            role="gridcell"
                                            aria-selected={isSelected}
                                            disabled={disabled}
                                            aria-label={`${date.getDate()} ${
                                                MONTHS[date.getMonth()]
                                            } ${date.getFullYear()}`}
                                            className={`${styles.day} ${
                                                isSelected ? styles.daySelected : ''
                                            } ${isToday ? styles.dayToday : ''}`}
                                            onClick={() => chooseDate(date)}
                                        >
                                            {date.getDate()}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className={styles.footer}>
                                <button
                                    type="button"
                                    className={styles.today}
                                    onClick={() => chooseDate(today)}
                                >
                                    Today
                                </button>
                                {value && (
                                    <button
                                        type="button"
                                        className={styles.clear}
                                        onClick={() => {
                                            onChange('');
                                            setOpen(false);
                                            triggerRef.current?.focus();
                                        }}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </>,
                    document.body,
                )}
        </div>
    );
};

export default DatePicker;
