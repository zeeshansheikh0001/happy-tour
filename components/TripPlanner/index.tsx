import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { holidayDestinations } from '../../data/staticData';
import DatePicker from '../DatePicker';
import Icon3D from '../Icon3D';
import Select from '../Select';
import styles from './TripPlanner.module.scss';

interface TripPlannerProps {
  defaultDestination?: string;
  lockDestination?: boolean;
  variant?: 'card' | 'bar';
}

const MAX_PARTY = 10;

const TripPlanner: React.FC<TripPlannerProps> = ({
  defaultDestination = '',
  lockDestination = false,
  variant = 'card',
}) => {
  const router = useRouter();
  const [destination, setDestination] = useState(defaultDestination);
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [partyOpen, setPartyOpen] = useState(false);
  const partyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDestination(defaultDestination);
  }, [defaultDestination]);

  const lockedName = holidayDestinations.find((item) => item.id === defaultDestination)?.name;
  const heading = lockDestination && lockedName ? `Request a ${lockedName} plan` : 'Request a plan';
  const note =
    lockDestination && lockedName
      ? `Share dates for ${lockedName}. No payment now. The team confirms availability.`
      : 'No payment now. The team confirms dates and availability.';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (date) params.set('date', date);
    params.set('travelers', String(adults + children));
    params.set('adults', String(adults));
    params.set('children', String(children));
    const query = params.toString();
    router.push(destination ? `/?${query}` : '/#featured-holidays');
  };

  const bar = variant === 'bar';
  const partyFull = adults + children >= MAX_PARTY;
  const partySummary = children
    ? `${adults} adult${adults === 1 ? '' : 's'}, ${children} child${children === 1 ? '' : 'ren'}`
    : `${adults} adult${adults === 1 ? '' : 's'}`;

  useEffect(() => {
    if (!partyOpen) {
      return undefined;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!partyRef.current?.contains(event.target as Node)) {
        setPartyOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPartyOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [partyOpen]);

  return (
    <section
      className={`${styles.section} ${bar ? styles.sectionBar : ''}`}
      id="plan-trip"
      aria-labelledby={bar ? undefined : 'plan-trip-heading'}
    >
      <form className={`${styles.form} ${bar ? styles.formBar : ''}`} onSubmit={handleSubmit}>
        {bar && (
          <div className={styles.mobileIntro}>
            <h2 className={styles.mobileHeading}>Your next trip starts here</h2>
            <p className={styles.mobileLede}>A few details. We&apos;ll take care of the rest.</p>
          </div>
        )}
        {!bar && (
          <div className={styles.copy}>
            <p className={styles.kicker}>Start here</p>
            <h2 id="plan-trip-heading" className={styles.heading}>
              {heading}
            </h2>
            <p className={styles.note}>{note}</p>
          </div>
        )}

        <div className={`${styles.field} ${bar ? styles.fieldBar : ''}`}>
          {bar && (
            <span className={styles.fieldIcon} aria-hidden="true">
              <PinIcon />
            </span>
          )}
          <span className={bar ? styles.fieldBody : undefined}>
            <span id="plan-destination-label" className={bar ? styles.fieldLabel : undefined}>
              Destination
            </span>
            <Select
              value={destination}
              labelledBy="plan-destination-label"
              placeholder="Where to?"
              compact={!bar}
              plain={bar}
              options={holidayDestinations
                .filter((item) => !lockDestination || item.id === defaultDestination)
                .map((item) => ({
                  value: item.id,
                  label: item.name,
                  hint: item.name.includes(item.country) ? undefined : item.country,
                }))}
              onChange={setDestination}
            />
          </span>
        </div>

        <div className={`${styles.field} ${bar ? styles.fieldBar : ''}`}>
          {bar && (
            <span className={styles.fieldIcon} aria-hidden="true">
              <CalendarIcon />
            </span>
          )}
          <span className={bar ? styles.fieldBody : undefined}>
            <span id="plan-travel-date-label" className={bar ? styles.fieldLabel : undefined}>
              Travel date
            </span>
            <DatePicker
              value={date}
              labelledBy="plan-travel-date-label"
              placeholder="Select a date"
              compact={!bar}
              plain={bar}
              onChange={setDate}
            />
          </span>
        </div>

        <div className={`${styles.field} ${bar ? styles.fieldBar : ''}`}>
          {bar && (
            <span className={styles.fieldIcon} aria-hidden="true">
              <PeopleIcon />
            </span>
          )}
          <span className={bar ? styles.fieldBody : undefined}>
            <span id="plan-travellers-label" className={bar ? styles.fieldLabel : undefined}>
              Travellers
            </span>
            <div className={styles.party} ref={partyRef}>
              <button
                type="button"
                className={styles.partyTrigger}
                aria-expanded={partyOpen}
                aria-labelledby="plan-travellers-label"
                onClick={() => setPartyOpen((open) => !open)}
              >
                <span className={styles.partySummary}>{partySummary}</span>
                <ChevronIcon />
              </button>
              {partyOpen && (
                <div className={styles.partyMenu} role="group" aria-label="Adults and children">
                  <PartyRow
                    label="Adult"
                    value={adults}
                    min={1}
                    disablePlus={partyFull}
                    onChange={setAdults}
                  />
                  <PartyRow
                    label="Child"
                    value={children}
                    min={0}
                    disablePlus={partyFull}
                    onChange={setChildren}
                  />
                </div>
              )}
            </div>
          </span>
        </div>

        <button type="submit" className={`${styles.submit} ${bar ? styles.submitBar : ''}`}>
          Request a plan
          {bar ? <ArrowIcon /> : <Icon3D name="arrow" alt="" size={16} />}
        </button>
      </form>
    </section>
  );
};

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const PinIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);

const CalendarIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" />
  </svg>
);

const PeopleIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <circle cx="9" cy="8" r="2.4" />
    <path d="M4.5 18.5c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4" />
    <circle cx="16.2" cy="8.5" r="2" />
    <path d="M16 14.6c1.6.3 2.9 1.4 3.5 3.4" />
  </svg>
);

function PartyRow({
  label,
  value,
  min,
  disablePlus,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  disablePlus: boolean;
  onChange: (next: number) => void;
}) {
  return (
    <div className={styles.partyRow}>
      <span className={styles.partyName}>{label}</span>
      <span className={styles.partyCount}>
        <button
          type="button"
          className={styles.step}
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <MinusIcon />
        </button>
        <span className={styles.partyNumber}>{value}</span>
        <button
          type="button"
          className={styles.step}
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={disablePlus}
          onClick={() => onChange(value + 1)}
        >
          <PlusIcon />
        </button>
      </span>
    </div>
  );
}

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default TripPlanner;
