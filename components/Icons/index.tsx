import React, { useId } from 'react';

type IconProps = {
  size?: number;
  className?: string;
};

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Icon({ size = 18, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.5 6.5L9 12l5.5 5.5" {...stroke} />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 6.5L15 12l-5.5 5.5" {...stroke} />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 9.5L12 15l5.5-5.5" {...stroke} />
    </Icon>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 14.5L12 9l5.5 5.5" {...stroke} />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 7l10 10M17 7L7 17" {...stroke} />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12.5l4.2 4.2L19 7.2" {...stroke} />
    </Icon>
  );
}

export function CheckBadgeIcon({ size = 20, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#e7f6ee" />
      <path d="M7.2 12.4l3.1 3.1 6.5-6.8" fill="none" stroke="#1f8a4c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseBadgeIcon({ size = 20, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#fdecec" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke="#d14343" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.5 6.5h15l-5.4 6.2v5.1l-4.2 1.6v-6.7L4.5 6.5z" {...stroke} />
    </Icon>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 6.5H7.2A1.7 1.7 0 0 0 5.5 8.2v8.6a1.7 1.7 0 0 0 1.7 1.7h8.6a1.7 1.7 0 0 0 1.7-1.7V14" {...stroke} />
      <path d="M13 5.5h5.5V11M18.2 5.8L11 13" {...stroke} />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4.5" y="5.5" width="15" height="14" rx="2" {...stroke} />
      <path d="M8 4.5v3M16 4.5v3M4.5 10h15" {...stroke} />
    </Icon>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="2.6" {...stroke} />
      <path d="M6.8 18.2c.6-2.8 2.6-4.2 5.2-4.2s4.6 1.4 5.2 4.2" {...stroke} />
    </Icon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20s6-5.1 6-9.2A6 6 0 0 0 6 10.8C6 14.9 12 20 12 20z" {...stroke} />
      <circle cx="12" cy="10.6" r="1.8" {...stroke} />
    </Icon>
  );
}

export function PlaneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 13.2l16-6.2-4.2 12.2-3.2-4.4-4.2 2.2.6-4.2L4 13.2z" {...stroke} />
    </Icon>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 17.5V8.5M4 14.5h16v3M8 14.5v-3.2A1.8 1.8 0 0 1 9.8 9.5H20v5" {...stroke} />
    </Icon>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 15.5l1.2-4.2A2 2 0 0 1 8.1 9.8h7.8a2 2 0 0 1 1.9 1.5l1.2 4.2" {...stroke} />
      <path d="M4.5 15.5h15v2.2a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1v-2.2z" {...stroke} />
      <circle cx="7.5" cy="16.2" r="0.8" fill="currentColor" />
      <circle cx="16.5" cy="16.2" r="0.8" fill="currentColor" />
    </Icon>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="7" width="16" height="12" rx="2.2" {...stroke} />
      <circle cx="12" cy="13" r="3" {...stroke} />
      <path d="M9 7l1.2-2h3.6L15 7" {...stroke} />
    </Icon>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="6" y="4.5" width="12" height="15.5" rx="2" {...stroke} />
      <path d="M9 4.8h6v1.6a1.2 1.2 0 0 1-1.2 1.2h-3.6A1.2 1.2 0 0 1 9 6.4V4.8z" {...stroke} />
      <path d="M9 12h6M9 15.5h4" {...stroke} />
    </Icon>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 19.5V6.8A1.3 1.3 0 0 1 6.3 5.5h7.4A1.3 1.3 0 0 1 15 6.8v12.7" {...stroke} />
      <path d="M15 10.5h2.7a1.3 1.3 0 0 1 1.3 1.3v7.7M4 19.5h16" {...stroke} />
      <path d="M8 9h2M8 12.5h2M8 16h2" {...stroke} />
    </Icon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="7.5" {...stroke} />
      <path d="M10.2 8.8v6.4L15.6 12 10.2 8.8z" {...stroke} />
    </Icon>
  );
}

export function StarIcon({
  size = 18,
  amount = 1,
  className,
}: IconProps & { amount?: 0 | 0.5 | 1 }) {
  const clipId = useId().replace(/:/g, '');
  const path = 'M12 3.7l1.9 4.3 4.7.5-3.5 3.2.9 4.6L12 14.2 8 16.3l.9-4.6L5.4 8.5l4.7-.5L12 3.7z';

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {amount === 0.5 ? (
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      ) : null}
      <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {amount > 0 ? (
        <path d={path} fill="currentColor" clipPath={amount === 0.5 ? `url(#${clipId})` : undefined} />
      ) : null}
    </svg>
  );
}
