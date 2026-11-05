import React, { useEffect, useMemo, useRef } from 'react';
import styles from './TrustSocialProof.module.scss';

const PLACEHOLDER = '—';

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface CountUpValueProps {
    value?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

interface WheelItem {
    type: 'digit' | 'symbol';
    char: string;
    digitIndex: number;
}

const buildItems = (text: string): WheelItem[] => {
    let digitIndex = 0;

    return text.split('').map((char) => {
        if (/\d/.test(char)) {
            const item: WheelItem = { type: 'digit', char, digitIndex };
            digitIndex += 1;
            return item;
        }

        return { type: 'symbol', char, digitIndex };
    });
};

const CountUpValue: React.FC<CountUpValueProps> = ({
    value,
    prefix = '',
    suffix = '',
    className,
}) => {
    const hasValue = typeof value === 'number' && Number.isFinite(value);
    const finalText = hasValue
        ? `${prefix}${value.toLocaleString('en-US')}${suffix}`
        : PLACEHOLDER;
    const items = useMemo(
        () => (hasValue ? buildItems(finalText) : []),
        [finalText, hasValue],
    );
    const nodeRef = useRef<HTMLSpanElement>(null);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!hasValue) {
            return undefined;
        }

        const node = nodeRef.current;
        if (!node) {
            return undefined;
        }

        const spinReels = () => {
            if (startedRef.current) {
                return;
            }

            startedRef.current = true;
            const strips = Array.from(
                node.querySelectorAll<HTMLElement>('[data-reel-offset]'),
            );

            if (prefersReducedMotion() || typeof strips[0]?.animate !== 'function') {
                strips.forEach((strip) => {
                    const offset = Number(strip.dataset.reelOffset);
                    strip.style.transform = `translate3d(0, ${-offset}em, 0)`;
                });
                return;
            }

            strips.forEach((strip) => {
                const offset = Number(strip.dataset.reelOffset);
                const duration = Number(strip.dataset.reelDuration);
                const delay = Number(strip.dataset.reelDelay);

                strip.animate(
                    [
                        { transform: 'translate3d(0, 0, 0)' },
                        { transform: `translate3d(0, ${-offset}em, 0)` },
                    ],
                    {
                        duration,
                        delay,
                        easing: 'cubic-bezier(0.12, 0.62, 0.18, 1)',
                        fill: 'forwards',
                    },
                );
            });
        };

        const isInView = () => {
            const rect = node.getBoundingClientRect();
            const viewHeight = window.innerHeight || 1;
            return rect.top < viewHeight * 0.88 && rect.bottom > viewHeight * 0.12;
        };

        if (isInView()) {
            spinReels();
            return undefined;
        }

        let frame = 0;
        const onScroll = () => {
            if (frame || startedRef.current) {
                return;
            }

            frame = window.requestAnimationFrame(() => {
                frame = 0;
                if (isInView()) {
                    spinReels();
                }
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    spinReels();
                }
            },
            { threshold: 0.2 },
        );

        observer.observe(node);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        onScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, [hasValue]);

    if (!hasValue) {
        return <span className={className}>{PLACEHOLDER}</span>;
    }

    return (
        <span
            ref={nodeRef}
            className={`${styles.wheel} ${className || ''}`.trim()}
            aria-label={finalText}
        >
            {items.map((item, index) => {
                if (item.type === 'symbol') {
                    return (
                        <span
                            key={`${item.char}-${index}`}
                            className={styles.wheelSymbol}
                            aria-hidden="true"
                        >
                            {item.char}
                        </span>
                    );
                }

                const digit = Number(item.char);
                const cycles = 3 + Math.min(item.digitIndex, 2);
                const offset = (cycles - 1) * 10 + digit;
                const duration = 1600 + item.digitIndex * 360;
                const delay = item.digitIndex * 80;
                const digits = Array.from({ length: cycles * 10 }, (_, n) => n % 10);

                return (
                    <span key={`reel-${index}`} className={styles.reel} aria-hidden="true">
                        <span
                            className={styles.reelStrip}
                            data-reel-offset={offset}
                            data-reel-duration={duration}
                            data-reel-delay={delay}
                        >
                            {digits.map((n, digitKey) => (
                                <span key={`${digitKey}-${n}`} className={styles.reelDigit}>
                                    {n}
                                </span>
                            ))}
                        </span>
                    </span>
                );
            })}
        </span>
    );
};

export default CountUpValue;
