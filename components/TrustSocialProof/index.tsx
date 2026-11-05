import React from 'react';
import Link from 'next/link';
import {
    trustIndicators,
    trustSocialLinks,
    trustStats,
} from '../../data/staticData';
import { TrustStat } from '../../types/staticData';
import CountUpValue from './CountUpValue';
import SectionHeading from '../SectionHeading';
import styles from './TrustSocialProof.module.scss';

const DESCRIPTION =
    'From Dubai and Vietnam holidays to India trips in Ladakh, Kashmir, and the North East, we make every journey easier, more comfortable, and truly memorable.';

interface TrustSocialProofProps {
    stats?: TrustStat[];
}

const TrustSocialProof: React.FC<TrustSocialProofProps> = ({ stats = trustStats }) => (
    <section className={styles.section} aria-labelledby="trust-heading">
        <div className={styles.inner}>
            <div className={styles.top}>
                <div className={styles.copy}>
                    <SectionHeading
                        eyebrow="Why travel with us"
                        icon="compass"
                        title="Trips that feel looked after"
                        titleId="trust-heading"
                        description={DESCRIPTION}
                        action={{ href: '/customize?source=plan-trip', label: 'Plan your trip' }}
                        className={styles.trustHeading}
                    />
                </div>

                <dl className={styles.stats}>
                    {stats.map((stat) => (
                        <div key={stat.id} className={styles.stat}>
                            <LineIcon name={stat.id} />
                            <dd className={styles.statValue}>
                                <CountUpValue
                                    value={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </dd>
                            <dt className={styles.statLabel}>{stat.label}</dt>
                        </div>
                    ))}
                </dl>
            </div>

            <div className={styles.meta}>
                <ul className={styles.indicators}>
                    {trustIndicators.map((item) => (
                        <li key={item.id} className={styles.indicator}>
                            <LineIcon name={item.id} />
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>

                <ul className={styles.socials}>
                    {trustSocialLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.social}
                                aria-label={link.label}
                            >
                                <LineIcon name={link.id} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);

const iconPaths: Record<string, React.ReactNode> = {
    itineraries: (
        <>
            <rect x="6" y="3.5" width="12" height="17" rx="2" />
            <path d="M9 8h6M9 12h6M9 16h3" />
        </>
    ),
    planning: (
        <>
            <circle cx="12" cy="12" r="8" />
            <path d="M14.6 9.4l-1.2 4-4 1.2 1.2-4 4-1.2z" />
        </>
    ),
    support: (
        <path d="M8 4.5h2.2l1.1 3-1.6 1.1a12 12 0 0 0 5.7 5.7l1.1-1.6 3 1.1V16a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 6 5.7 2 2 0 0 1 8 4.5z" />
    ),
    travelers: (
        <>
            <circle cx="9" cy="8" r="2.1" />
            <circle cx="15.4" cy="8.7" r="1.7" />
            <path d="M4.6 18.2c.7-2.5 2.3-3.7 4.4-3.7s3.7 1.2 4.4 3.7" />
            <path d="M13.2 18.2c.4-1.7 1.5-2.6 3-2.6 1.3 0 2.4.7 3 2.3" />
        </>
    ),
    experiences: (
        <>
            <path d="M4 9.5h16v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5z" />
            <path d="M4 9.5l2.2-4h11.6l2.2 4M12 5.5v14" />
        </>
    ),
    destinations: (
        <>
            <path d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10z" />
            <circle cx="12" cy="11" r="1.8" />
        </>
    ),
    satisfaction: (
        <>
            <circle cx="12" cy="12" r="3.2" />
            <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M18 6l-1.6 1.6M7.6 16.4L6 18" />
        </>
    ),
    linkedin: (
        <>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 10.5V16M8 8h.01M12 16v-3.2a1.8 1.8 0 1 1 3.6 0V16" />
        </>
    ),
    instagram: (
        <>
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="3.2" />
            <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
        </>
    ),
    twitter: <path d="M7 7l10 10M17 7L7 17" />,
    facebook: (
        <path
            data-solid="true"
            d="M14.2 8.2V6h-1.7C10.4 6 9.2 7.3 9.2 9.3V11H7.5v2.3h1.7V19h2.4v-5.7h2l.4-2.3h-2.4V9.4c0-.6.3-1.2.9-1.2h.7z"
        />
    ),
};

function CompassIcon() {
    return (
        <svg className={styles.compass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M14.6 9.4l-1.2 4-4 1.2 1.2-4 4-1.2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
    );
}

function LineIcon({ name }: { name: string }) {
    return (
        <svg
            className={styles.lineIcon}
            data-icon={name}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            {iconPaths[name]}
        </svg>
    );
}

export default TrustSocialProof;
