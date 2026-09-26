import {
  LayoutDashboard,
  Home,
  Info,
  Network,
  BarChart3,
  FileText,
  Newspaper,
  Image as ImageIcon,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import type { AdminRole } from '@/lib/auth-context';

export interface NavChild {
  href: string;
  label: string;
}

/** A top-level sidebar entry: either a direct link (`href`) or a
 *  collapsible group of `children`. */
export interface NavEntry {
  label: string;
  icon: LucideIcon;
  href?: string;
  children?: NavChild[];
  /** Restrict this entry to specific roles; omit to show everyone. */
  roles?: AdminRole[];
}

export const NAV: NavEntry[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  {
    label: 'Home page',
    icon: Home,
    children: [
      { href: '/home/stats', label: 'Stats' },
      { href: '/home/why-npix', label: 'Why NPIX' },
    ],
  },
  {
    label: 'About us',
    icon: Info,
    children: [
      { href: '/about/core-values', label: 'Core values' },
      { href: '/about/timeline', label: 'Timeline' },
      { href: '/about/team', label: 'Leadership team' },
      { href: '/about/page-copy', label: 'Page copy' },
    ],
  },
  { label: 'Members', icon: Network, href: '/members' },
  {
    label: 'Statistics',
    icon: BarChart3,
    children: [
      { href: '/statistics/stats', label: 'Insight & infra stats' },
      { href: '/statistics/protocol-adoption', label: 'Protocol adoption' },
      { href: '/statistics/points-of-presence', label: 'Points of presence' },
      { href: '/statistics/traffic-panels', label: 'Traffic panels' },
    ],
  },
  {
    label: 'Documentation',
    icon: FileText,
    children: [
      { href: '/documents', label: 'Documents' },
      { href: '/documents/categories', label: 'Categories' },
      { href: '/faqs', label: 'FAQs' },
    ],
  },
  { label: 'News & events', icon: Newspaper, href: '/news' },
  { label: 'Media', icon: ImageIcon, href: '/media' },
  {
    label: 'Settings',
    icon: Settings,
    roles: ['SUPER_ADMIN'],
    children: [
      { href: '/settings', label: 'Site settings' },
      { href: '/settings/users', label: 'Users & roles' },
    ],
  },
];

export function navForRole(role: AdminRole | undefined): NavEntry[] {
  return NAV.filter((entry) => !entry.roles || (role && entry.roles.includes(role)));
}

/** Label of the group containing `pathname`, or null (direct links and
 *  unknown routes have no group). */
export function activeGroupLabel(pathname: string): string | null {
  return NAV.find((entry) => entry.children?.some((c) => c.href === pathname))?.label ?? null;
}

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail below "Admin" for a route, derived from the nav. */
export function breadcrumbFor(pathname: string): Crumb[] {
  for (const entry of NAV) {
    if (entry.href === pathname) return [{ label: entry.label }];
    const child = entry.children?.find((c) => c.href === pathname);
    if (child) return [{ label: entry.label, href: entry.children![0].href }, { label: child.label }];
  }
  // Routes outside the nav still get a readable trail from their segments.
  return pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => ({ label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ') }));
}

export interface NavSearchItem {
  href: string;
  label: string;
  /** Parent group label, shown as context in search results. */
  group?: string;
}

/** Every navigable page for the top bar's "Search or go to…" box. */
export function searchItemsFor(entries: NavEntry[]): NavSearchItem[] {
  return entries.flatMap((entry) =>
    entry.children
      ? entry.children.map((c) => ({ href: c.href, label: c.label, group: entry.label }))
      : [{ href: entry.href!, label: entry.label }],
  );
}
