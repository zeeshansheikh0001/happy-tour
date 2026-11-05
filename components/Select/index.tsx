import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronDown } from 'react-icons/fi';
import styles from './Select.module.scss';

interface SelectOption {
    value: string;
    label: string;
    hint?: string;
}

interface SelectProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    labelledBy: string;
    placeholder?: string;
    compact?: boolean;
    plain?: boolean;
    invalid?: boolean;
    describedBy?: string;
}

const Select: React.FC<SelectProps> = ({
    id,
    value,
    onChange,
    options,
    labelledBy,
    placeholder = 'Select',
    compact = false,
    plain = false,
    invalid = false,
    describedBy,
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLUListElement>(null);
    const [open, setOpen] = useState(false);
    const [sheet, setSheet] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const selected = options.find((option) => option.value === value);

    useEffect(() => {
        if (!open) return undefined;

        const media = window.matchMedia('(max-width: 767px)');

        const place = () => {
            const isSheet = media.matches;
            setSheet(isSheet);
            const box = triggerRef.current?.getBoundingClientRect();
            if (!box) return;

            const width = Math.max(box.width, 180);
            const height = panelRef.current?.offsetHeight ?? 280;
            let left = box.left;
            if (left + width > window.innerWidth - 16) {
                left = Math.max(16, window.innerWidth - width - 16);
            }
            let top = box.bottom + 8;
            if (top + height > window.innerHeight - 16) {
                top = Math.max(16, box.top - height - 8);
            }
            setCoords({ top, left, width });
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
    }, [open]);

    const choose = (next: string) => {
        onChange(next);
        setOpen(false);
        triggerRef.current?.focus();
    };

    const panel =
        open &&
        typeof document !== 'undefined' &&
        createPortal(
            <>
                <button
                    type="button"
                    className={styles.backdrop}
                    aria-label="Close list"
                    onClick={() => setOpen(false)}
                />
                <ul
                    ref={panelRef}
                    className={styles.panel}
                    role="listbox"
                    aria-labelledby={labelledBy}
                    style={
                        sheet
                            ? undefined
                            : { top: coords.top, left: coords.left, minWidth: coords.width }
                    }
                >
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={value === option.value}
                                className={`${styles.option} ${
                                    value === option.value ? styles.optionActive : ''
                                }`}
                                onClick={() => choose(option.value)}
                            >
                                <span className={styles.optionLabel}>{option.label}</span>
                                {option.hint && (
                                    <span className={styles.optionHint}>{option.hint}</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </>,
            document.body,
        );

    return (
        <div className={styles.root} ref={rootRef}>
            <button
                ref={triggerRef}
                type="button"
                id={id}
                className={`${styles.trigger} ${compact ? styles.triggerCompact : ''} ${
                    plain ? styles.triggerPlain : ''
                } ${!selected ? styles.triggerEmpty : ''} ${open ? styles.triggerOpen : ''}`}
                aria-labelledby={labelledBy}
                aria-describedby={describedBy}
                data-invalid={invalid ? 'true' : undefined}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
            >
                <span className={styles.value}>{selected?.label || placeholder}</span>
                <FiChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
            </button>
            {panel}
        </div>
    );
};

export default Select;
