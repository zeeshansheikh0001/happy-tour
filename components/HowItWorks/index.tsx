import React from 'react';
import Link from 'next/link';
import styles from './HowItWorks.module.scss';

interface HowItWorksProps {
    destinationName?: string;
}

const ClipboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="4.5" width="12" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path
            d="M9 4.8h6v1.6a1.2 1.2 0 0 1-1.2 1.2h-3.6A1.2 1.2 0 0 1 9 6.4V4.8z"
            stroke="currentColor"
            strokeWidth="1.7"
        />
        <path d="M9 12h6M9 15.5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
);

const CompassIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
        <path
            d="M14.6 9.4l-1.2 4-4 1.2 1.2-4 4-1.2z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
        />
    </svg>
);

const TicketIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M5 8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5v1.2a2 2 0 0 0 0 4V16a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16v-2.3a2 2 0 0 0 0-4V8.5z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
        />
        <path d="M12 8.5v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="1.6 2.2" />
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M12 3.5l7 2.8v5.4c0 4.1-2.7 7-7 8.8-4.3-1.8-7-4.7-7-8.8V6.3l7-2.8z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

const STEPS = [
    {
        id: 'enquire',
        tone: 'blue',
        title: 'Tell us your plans',
        text: 'Share your destination, dates and who is travelling.',
        icon: <ClipboardIcon />,
    },
    {
        id: 'shape',
        tone: 'orange',
        title: 'Make it your kind of trip',
        text: 'We tailor your stay and inclusions. Flights only when specified.',
        icon: <CompassIcon />,
    },
    {
        id: 'confirm',
        tone: 'pink',
        title: 'Confirm and get ready',
        text: 'Review the details. We book only after you agree.',
        icon: <TicketIcon />,
    },
];

const HowItWorks: React.FC<HowItWorksProps> = ({ destinationName }) => {
    const cards = STEPS.map((step) => {
        if (!destinationName) return step;
        if (step.id === 'enquire') {
            return {
                ...step,
                title: `Tell us your ${destinationName} plans`,
                text: 'Share your dates and who is travelling.',
            };
        }
        if (step.id === 'shape') {
            return {
                ...step,
                text: `We tailor your ${destinationName} stay and inclusions. Flights only when specified.`,
            };
        }
        return step;
    });
    const lede = destinationName
        ? `A few simple steps for ${destinationName}. Nothing is booked until you agree.`
        : 'A few simple steps. Nothing is booked until you agree.';

    return (
        <section className={styles.section} id="how-it-works" aria-labelledby="how-it-works-heading">
            <div className={styles.inner}>
                <div className={styles.head}>
                    <div>
                        <p className={styles.eyebrow}>
                            <ClipboardIcon />
                            How it works
                        </p>
                        <h2 id="how-it-works-heading">
                            Your next trip,
                            <br />
                            made
                            {' '}
                            <span className={styles.mark}>simple.</span>
                        </h2>
                        <p className={styles.lede}>{lede}</p>
                    </div>
                    <Link href="/customize?source=plan-trip" className={styles.cta}>
                        Plan your trip
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                <ol className={styles.steps}>
                    {cards.map((step, index) => (
                        <li key={step.id} className={styles.step}>
                            <div className={styles.marker}>
                                <span className={`${styles.icon} ${styles[step.tone]}`}>{step.icon}</span>
                                <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
                                <span className={styles.connector} aria-hidden="true" />
                            </div>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.text}>{step.text}</p>
                        </li>
                    ))}
                </ol>

                <Link href="/customize?source=plan-trip" className={styles.ctaMobile}>
                    Plan your trip
                    <span aria-hidden="true">→</span>
                </Link>

                <p className={styles.note}>
                    <ShieldIcon />
                    No payment on the enquiry form.
                </p>
            </div>
        </section>
    );
};

export default HowItWorks;
