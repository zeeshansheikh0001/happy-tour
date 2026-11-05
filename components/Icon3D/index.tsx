import React from 'react';
import styles from './Icon3D.module.scss';

const ICONS = {
    compass: '/images/icons/3d/compass.png',
    camera: '/images/icons/3d/camera.png',
    beach: '/images/icons/3d/beach.png',
    passport: '/images/icons/3d/passport.png',
    yacht: '/images/icons/3d/sailboat.png',
    tickets: '/images/icons/3d/tickets.png',
    search: '/images/icons/animated/search.gif',
    person: '/images/icons/animated/user.gif',
    arrow: '/images/icons/animated/back.gif',
    building: '/images/icons/3d/building.png',
    airplane: '/images/icons/3d/airplane.png',
    clipboard: '/images/icons/3d/clipboard.png',
    document: '/images/icons/3d/document.png',
    calendar: '/images/icons/3d/calendar.png',
    receiver: '/images/icons/3d/receiver.png',
    star: '/images/icons/animated/star.gif',
    glowStar: '/images/icons/3d/glow-star.png',
    check: '/images/icons/3d/check.png',
    map: '/images/icons/3d/map.png',
} as const;

export type Icon3DName = keyof typeof ICONS;

interface Icon3DProps {
    name: Icon3DName;
    alt?: string;
    size?: number;
    className?: string;
}

const Icon3D: React.FC<Icon3DProps> = ({ name, alt = '', size = 22, className }) => (
    <img
        src={ICONS[name]}
        alt={alt}
        width={size}
        height={size}
        className={`${styles.icon} ${name === 'arrow' ? styles.flip : ''} ${className || ''}`.trim()}
        draggable={false}
    />
);

export default Icon3D;
