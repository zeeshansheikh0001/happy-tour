import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon3D from '../Icon3D';
import SearchBar from '../SearchBar';
import CurrencySelector from '../CurrencySelector';
import LoginButton from '../LoginButton';
import { categoryNavItems } from './categoryNav';
import styles from './Header.module.scss';

type PillBox = { left: number; width: number };

let rememberedPill: PillBox | null = null;

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeNavItem?: string;
  onNavigate: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onTabChange,
  activeNavItem = 'explore',
  onNavigate,
}) => {
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [pathSearch, setPathSearch] = useState('');
  const [pill, setPill] = useState<PillBox | null>(rememberedPill);
  const pillRef = useRef<PillBox | null>(rememberedPill);

  useEffect(() => {
    const search = router.asPath.includes('?')
      ? router.asPath.slice(router.asPath.indexOf('?') + 1).split('#')[0]
      : '';
    setPathSearch(search);
  }, [router.asPath]);

  const params = new URLSearchParams(pathSearch);
  const tab = params.get('tab') || '';
  const category = params.get('category') || '';
  const destination = params.get('destination') || '';

  const onActivitiesPage = router.pathname === '/activities';
  const onHomeActivities = router.pathname === '/' && tab === 'activities';
  const isActivitySection = onActivitiesPage || onHomeActivities;
  const isVisa = router.pathname === '/' && tab === 'visa';
  const isHolidays = (router.pathname === '/' && (tab === 'holidays' || Boolean(destination)))
    || router.pathname.startsWith('/tours');
  const isExplore = router.pathname === '/' && !isActivitySection && !isVisa && !isHolidays;
  const isActivities = isActivitySection && !category;
  const isYachtCruise = isActivitySection && (category === 'cruises' || category === 'yachts');
  const isEvents = isActivitySection && category === 'events';

  const closeOverlays = () => {
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    let frame = 0;
    let scrollTimer = 0;
    let sliding = false;
    let cancelled = false;

    const readPill = (): PillBox | null => {
      const active = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (!active) return null;
      return { left: active.offsetLeft, width: active.offsetWidth };
    };

    const samePill = (a: PillBox | null, b: PillBox | null) => (
      !!a && !!b && Math.abs(a.left - b.left) < 0.5 && Math.abs(a.width - b.width) < 0.5
    );

    const scrollActiveIntoView = () => {
      const active = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (!active) return;
      const navBox = nav.getBoundingClientRect();
      const activeBox = active.getBoundingClientRect();
      const padding = 8;
      const clipped = activeBox.left < navBox.left + padding
        || activeBox.right > navBox.right - padding;
      if (!clipped) return;
      const nextLeft = nav.scrollLeft
        + (activeBox.left - navBox.left)
        - (navBox.width - activeBox.width) / 2;
      nav.scrollTo({ left: Math.max(0, nextLeft), behavior: 'smooth' });
    };

    const commit = (next: PillBox) => {
      pillRef.current = next;
      rememberedPill = next;
      setPill(next);
    };

    const measure = (animate: boolean) => {
      const next = readPill();
      if (!next) {
        pillRef.current = null;
        rememberedPill = null;
        setPill(null);
        return;
      }

      const from = pillRef.current;
      const moved = !samePill(from, next);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (animate && moved && from && !reduceMotion) {
        sliding = true;
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (cancelled) return;
            commit(next);
            sliding = false;
          });
        });
        scrollTimer = window.setTimeout(scrollActiveIntoView, 300);
        return;
      }

      commit(next);
      scrollActiveIntoView();
    };

    measure(true);
    const onResize = () => {
      if (sliding) return;
      measure(false);
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(nav);
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(scrollTimer);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [isActivities, isExplore, isHolidays, isVisa, isYachtCruise, isEvents]);

  const goHome = () => {
    onNavigate('explore');
    onTabChange('tours');
    closeOverlays();
  };

  const activeById: Record<string, boolean> = {
    explore: isExplore,
    activities: isActivities,
    holidays: isHolidays,
    visas: isVisa,
    'yacht-cruise': isYachtCruise,
    events: isEvents,
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.offerStrip}>
        <Link
          href="/?tab=holidays"
          className={styles.offerLink}
          onClick={closeOverlays}
        >
          <StarIcon />
          <p className={styles.offerText}>
            Flat <strong>15% off</strong> on flight-inclusive holidays
          </p>
          <span className={styles.offerCode}>TOGO15</span>
          <span className={styles.offerCta}>Book now</span>
        </Link>
      </div>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.logo} aria-label="Happy Trails home" onClick={goHome}>
            <span className={styles.logoText}>Happy</span>
          </Link>

          <div className={styles.actions}>
            <div className={styles.currency}>
              <CurrencySelector />
            </div>
            <button
              type="button"
              className={`${styles.iconButton} ${isSearchOpen ? styles.iconButtonActive : ''}`}
              aria-label={isSearchOpen ? 'Close search' : 'Search'}
              aria-expanded={isSearchOpen}
              onClick={() => {
                setIsSearchOpen((open) => !open);
                setIsProfileOpen(false);
              }}
            >
              <SearchIcon />
            </button>
            <button type="button" className={styles.iconButton} aria-label="Wishlist">
              <HeartIcon />
            </button>
            <div className={styles.profileWrap}>
              <button
                type="button"
                className={`${styles.iconButton} ${isProfileOpen ? styles.iconButtonActive : ''}`}
                aria-label="User profile"
                aria-expanded={isProfileOpen}
                onClick={() => {
                  setIsProfileOpen((open) => !open);
                  setIsSearchOpen(false);
                }}
              >
                <UserIcon />
              </button>
              {isProfileOpen && (
                <div className={styles.profileMenu} role="menu" aria-label="Account">
                  <LoginButton />
                </div>
              )}
            </div>
            <Link href="/customize?source=plan-trip" className={styles.cta} onClick={closeOverlays}>
              Plan Your Trip
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <nav ref={navRef} className={styles.nav} aria-label="Primary">
          {pill && (
            <span
              className={styles.indicator}
              style={{ left: pill.left, width: pill.width }}
              aria-hidden="true"
            />
          )}
          {categoryNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${activeById[item.id] ? styles.navItemActive : ''}`}
              aria-current={activeById[item.id] ? 'page' : undefined}
              onClick={closeOverlays}
            >
              <Icon3D name={item.icon} alt="" size={22} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {isSearchOpen && (
        <div className={styles.searchPanel}>
          <SearchBar placeholder="Search for Dubai" />
        </div>
      )}
    </header>
  );
};

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16.5L20 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19s-6.2-3.8-8.2-7.2C2.4 9.6 3.2 6.8 5.8 6.2 7.4 5.8 9 6.4 12 8.8c3-2.4 4.6-3 6.2-2.6 2.6.6 3.4 3.4 2 5.6C18.2 15.2 12 19 12 19z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 19.2c1.2-3 3.4-4.4 6.5-4.4s5.3 1.4 6.5 4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m12 3.5 2.1 4.8 5.2.5-3.9 3.4 1.2 5.1L12 14.8 7.4 17.3l1.2-5.1L4.7 8.8l5.2-.5L12 3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default Header;
