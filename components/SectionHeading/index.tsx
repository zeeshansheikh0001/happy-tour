import React from 'react';
import Link from 'next/link';
import styles from './SectionHeading.module.scss';

export type SectionHeadingIcon =
  | 'compass'
  | 'camera'
  | 'umbrella'
  | 'map'
  | 'passport'
  | 'star'
  | 'question'
  | 'clipboard'
  | 'yacht'
  | 'ticket';

interface SectionHeadingAction {
  href: string;
  label: string;
}

interface SectionHeadingProps {
  eyebrow?: string;
  icon?: SectionHeadingIcon;
  title: string;
  titleId?: string;
  description?: string;
  action?: SectionHeadingAction;
  as?: 'h1' | 'h2';
  size?: 'hero' | 'section';
  align?: 'start' | 'center';
  tone?: 'default' | 'inverse';
  showRule?: boolean;
  accent?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  icon = 'compass',
  title,
  titleId,
  description,
  action,
  as = 'h2',
  size,
  align = 'start',
  tone = 'default',
  showRule = false,
  accent = true,
  className,
}) => {
  const TitleTag = as;
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? title;
  const lead = words.join(' ');

  return (
    <header
      className={[
        styles.header,
        (size ?? (as === 'h1' ? 'hero' : 'section')) === 'hero' ? styles.hero : '',
        align === 'center' ? styles.center : '',
        tone === 'inverse' ? styles.inverse : '',
        className || '',
      ].filter(Boolean).join(' ')}
    >
      {eyebrow ? (
        <p className={styles.eyebrow}>
          <HeadingIcon name={icon} />
          {eyebrow}
        </p>
      ) : null}
      <TitleTag id={titleId} className={styles.title}>
        {accent ? (
          <>
            {lead ? `${lead} ` : null}
            <span className={styles.accent}>{last}</span>
          </>
        ) : (
          title
        )}
      </TitleTag>
      {(description || action) && (
        <div className={styles.meta}>
          {description ? <p className={styles.description}>{description}</p> : <span />}
          {action ? (
            <Link href={action.href} className={styles.action}>
              {action.label}
              <span className={styles.arrow} aria-hidden="true">
                <ArrowIcon />
              </span>
            </Link>
          ) : null}
        </div>
      )}
      {showRule ? (
        <div className={styles.rule} aria-hidden="true">
          <span />
        </div>
      ) : null}
    </header>
  );
};

function HeadingIcon({ name }: { name: SectionHeadingIcon }) {
  const common = {
    className: styles.icon,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true as const,
  };

  if (name === 'camera') {
    return (
      <svg {...common}>
        <rect x="4" y="7" width="16" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 7l1.2-2h3.6L15 7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'umbrella') {
    return (
      <svg {...common}>
        <path d="M12 4.5c-4.4 0-8 3.2-8 7.2h16c0-4-3.6-7.2-8-7.2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 11.7v5.2a2.2 2.2 0 0 0 2.2 2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'map') {
    return (
      <svg {...common}>
        <path d="M12 20s6-5.1 6-9.2A6 6 0 0 0 6 10.8C6 14.9 12 20 12 20z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="12" cy="10.6" r="1.8" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === 'passport') {
    return (
      <svg {...common}>
        <rect x="6" y="3.5" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 16.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'star') {
    return (
      <svg {...common}>
        <path d="M12 4.5l1.8 4.2 4.6.5-3.4 3.1.9 4.5L12 14.6 8.1 16.8l.9-4.5L5.6 9.2l4.6-.5L12 4.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'question') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9.6 9.6a2.4 2.4 0 1 1 3.3 2.2c-.7.4-1.1.9-1.1 1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="11.8" cy="16.2" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (name === 'yacht') {
    return (
      <svg {...common}>
        <path d="M4 15.5l8-3 8 3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M5 15.5l2.2 3.2h9.6L19 15.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 12.5V6.5M12 6.5l4 2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'ticket') {
    return (
      <svg {...common}>
        <path d="M5 8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5v1.2a2 2 0 0 0 0 4V16a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16v-2.3a2 2 0 0 0 0-4V8.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 8.5v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeDasharray="1.6 2.2" />
      </svg>
    );
  }

  if (name === 'clipboard') {
    return (
      <svg {...common}>
        <rect x="6" y="4.5" width="12" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 4.8h6v1.6a1.2 1.2 0 0 1-1.2 1.2h-3.6A1.2 1.2 0 0 1 9 6.4V4.8z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 12h6M9 15.5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14.6 9.4l-1.2 4-4 1.2 1.2-4 4-1.2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SectionHeading;
