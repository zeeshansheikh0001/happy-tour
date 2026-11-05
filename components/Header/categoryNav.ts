import { Icon3DName } from '../Icon3D';

export interface CategoryNavItem {
  id: string;
  label: string;
  href: string;
  icon: Icon3DName;
}

export const categoryNavItems: CategoryNavItem[] = [
  { id: 'explore', label: 'Explore', href: '/', icon: 'compass' },
  { id: 'activities', label: 'Activities', href: '/activities', icon: 'camera' },
  { id: 'holidays', label: 'Holidays', href: '/?tab=holidays', icon: 'beach' },
  { id: 'visas', label: 'Visas', href: '/?tab=visa', icon: 'passport' },
  { id: 'yacht-cruise', label: 'Yacht & Cruise', href: '/activities?category=cruises', icon: 'yacht' },
  { id: 'events', label: 'Events', href: '/activities?category=events', icon: 'tickets' },
];
