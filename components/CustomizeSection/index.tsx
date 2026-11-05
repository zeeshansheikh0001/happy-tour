import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { holidayDestinations } from '../../data/staticData';
import styles from './CustomizeSection.module.scss';

const STEPS = [
    { number: '1', title: 'Trip details', short: 'Details', text: 'Choose dates and travellers.' },
    { number: '2', title: 'Personalize', short: 'Personalize', text: 'Add your stay and experiences.' },
    { number: '3', title: 'Review', short: 'Review', text: 'Send your request for a quote.' },
];

const HELP = 'help';

interface CustomizeSectionProps {
    destinationId?: string;
    destinationName?: string;
}

const CheckBadge = () => (
    <span className={styles.check} aria-hidden="true">
        <svg viewBox="0 0 24 24">
            <path d="M6 12.5l4 4L18 8" />
        </svg>
    </span>
);

const CompassGlyph = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M14.8 9.2l-1.4 4.2-4.2 1.4 1.4-4.2 4.2-1.4z" />
    </svg>
);

const PinGlyph = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
        <circle cx="12" cy="11" r="2" />
    </svg>
);

const ShieldGlyph = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5l7 2.5v6.2c0 4.2-2.8 6.8-7 8.3-4.2-1.5-7-4.1-7-8.3V6l7-2.5z" />
        <path d="M9 12.2l2 2 4-4.2" />
    </svg>
);


const CustomizeSection: React.FC<CustomizeSectionProps> = ({ destinationId, destinationName }) => {
    const known = holidayDestinations.some((item) => item.id === destinationId);
    const initial = known && destinationId ? destinationId : 'dubai';
    const [selectedId, setSelectedId] = useState(initial);

    useEffect(() => {
        if (known && destinationId) setSelectedId(destinationId);
    }, [destinationId, known]);

    const selected = holidayDestinations.find((item) => item.id === selectedId);
    const href = selected
        ? `/customize?source=plan-trip&destination=${selected.id}`
        : '/customize?source=plan-trip';
    const buttonLabel = selected ? `Customize my ${selected.name} trip` : 'Help me choose';
    const selectedLabel = selected ? `Selected: ${selected.name}` : 'Selected: Help me choose';

    return (
        <section className={styles.section} id="customize-package" aria-labelledby="customize-package-heading">
            <div className={styles.inner}>
                <div className={styles.intro}>
                    <p className={styles.eyebrow}>
                        <CompassGlyph />
                        Build your trip
                    </p>
                    <h2 id="customize-package-heading">
                        Your trip.
                        <br />
                        Your way.
                    </h2>
                    <p className={styles.lead}>
                        {destinationName
                            ? `Start with ${destinationName}, or pick another place. `
                                + "We'll shape the details around you."
                            : "Pick a destination. We'll shape the details around you."}
                    </p>
                    <ol className={styles.steps}>
                        {STEPS.map((step) => (
                            <li key={step.number} className={styles.step}>
                                <span className={styles.number}>{step.number}</span>
                                <div>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepShort}>{step.short}</p>
                                    <p className={styles.stepText}>{step.text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Where would you like to go?</h3>
                    <p className={styles.cardLead}>Choose one destination to get started.</p>
                    <div className={styles.places} role="radiogroup" aria-label="Destination">
                        {holidayDestinations.map((place) => {
                            const on = selectedId === place.id;
                            return (
                                <button
                                    key={place.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={on}
                                    className={`${styles.place} ${on ? styles.placeOn : ''}`}
                                    onClick={() => setSelectedId(place.id)}
                                >
                                    <Image
                                        src={place.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 767px) 45vw, 220px"
                                        className={styles.photo}
                                    />
                                    <span className={styles.placeName}>{place.name}</span>
                                    {on ? <CheckBadge /> : null}
                                </button>
                            );
                        })}
                        <button
                            type="button"
                            role="radio"
                            aria-checked={selectedId === HELP}
                            className={`${styles.help} ${selectedId === HELP ? styles.placeOn : ''}`}
                            onClick={() => setSelectedId(HELP)}
                        >
                            <span className={styles.helpIcon} aria-hidden="true">
                                <CompassGlyph />
                            </span>
                            Help me choose
                            {selectedId === HELP ? <CheckBadge /> : null}
                        </button>
                    </div>
                    <p className={styles.selected}>
                        <PinGlyph />
                        {selectedLabel}
                    </p>
                    <Link href={href} className={styles.cta}>
                        {buttonLabel}
                        <span aria-hidden="true">→</span>
                    </Link>
                    <p className={styles.note}>
                        <ShieldGlyph />
                        No payment now. Our team reviews your request and shares a quote.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CustomizeSection;
