'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Home,
  Info,
  Heart,
  History,
  Users,
  FileText,
  Network,
  BarChart3,
  Activity,
  Percent,
  MapPin,
  Radio,
  FolderTree,
  HelpCircle,
  Newspaper,
  Image as ImageIcon,
  Settings,
  UserCog,
  ChevronsLeft,
  X,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  /** Restrict this group to specific roles; omit to show everyone. */
  roles?: Array<'SUPER_ADMIN' | 'EDITOR' | 'VIEWER'>;
}

const NAV: NavGroup[] = [
  { title: '', items: [{ href: '/', label: 'Dashboard', icon: LayoutDashboard }] },
  {
    title: 'Home Page',
    items: [
      { href: '/home/stats', label: 'Stats', icon: Activity },
      { href: '/home/why-npix', label: 'Why NPIX', icon: Home },
    ],
  },
  {
    title: 'About Us',
    items: [
      { href: '/about/core-values', label: 'Core Values', icon: Heart },
      { href: '/about/timeline', label: 'Timeline', icon: History },
      { href: '/about/team', label: 'Leadership Team', icon: Users },
      { href: '/about/page-copy', label: 'Page Copy', icon: Info },
    ],
  },
  { title: 'Members', items: [{ href: '/members', label: 'All Members', icon: Network }] },
  {
    title: 'Statistics',
    items: [
      { href: '/statistics/stats', label: 'Insight & Infra Stats', icon: BarChart3 },
      { href: '/statistics/protocol-adoption', label: 'Protocol Adoption', icon: Percent },
      { href: '/statistics/points-of-presence', label: 'Points of Presence', icon: MapPin },
      { href: '/statistics/traffic-panels', label: 'Traffic Panels', icon: Radio },
    ],
  },
  {
    title: 'Documentation',
    items: [
      { href: '/documents', label: 'Documents', icon: FileText },
      { href: '/documents/categories', label: 'Categories', icon: FolderTree },
      { href: '/faqs', label: 'FAQs', icon: HelpCircle },
    ],
  },
  { title: 'News & Events', items: [{ href: '/news', label: 'All Articles', icon: Newspaper }] },
  { title: 'Media', items: [{ href: '/media', label: 'Media Library', icon: ImageIcon }] },
  {
    title: 'Settings',
    items: [
      { href: '/settings', label: 'Site Settings', icon: Settings },
      { href: '/settings/users', label: 'Users & Roles', icon: UserCog },
    ],
    roles: ['SUPER_ADMIN'],
  },
];

/** Flat pathname -> label lookup, e.g. for the header breadcrumb. */
export const NAV_LABELS: Record<string, string> = Object.fromEntries(
  NAV.flatMap((group) => group.items.map((item) => [item.href, item.label])),
);

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export function Sidebar({
  mobileOpen,
  onCloseMobile,
}: {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const groups = NAV.filter((group) => !group.roles || (user && group.roles.includes(user.role)));

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex h-full shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-xl transition-all duration-200 lg:static lg:shadow-none',
          collapsed ? 'lg:w-[76px]' : 'lg:w-64',
          'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Brand header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-md ring-2 ring-[var(--primary-solid)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, no next/image usage elsewhere in this app */}
              <img src="/npix_black.png" alt="NPIX" className="h-full w-full object-contain" />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--primary-solid)] ring-1 ring-white" />
              </span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-[var(--foreground)]">NPIX</span>
                  <span className="rounded bg-[var(--primary-solid)] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white">
                    Admin
                  </span>
                </div>
                <span className="block truncate text-[11px] font-medium text-[var(--muted)]">
                  Nepal Internet Exchange
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--primary)] lg:flex"
            title="Toggle sidebar"
          >
            <ChevronsLeft className={clsx('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
          </button>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--surface-hover)] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
          {groups.map((group) => {
            return (
              <div key={group.title || group.items[0].href} className="pb-1">
                {group.title && !collapsed && (
                  <div className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                    {group.title}
                  </div>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onCloseMobile}
                        title={collapsed ? item.label : undefined}
                        className={clsx(
                          'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                          collapsed && 'justify-center px-0',
                          active
                            ? 'bg-[var(--primary-solid)] font-semibold text-white shadow-md'
                            : 'text-[var(--foreground)]/80 hover:bg-[var(--primary-tint)] hover:text-[var(--primary)]',
                        )}
                      >
                        <Icon
                          className={clsx(
                            'h-[18px] w-[18px] shrink-0',
                            active ? 'text-white' : 'text-[var(--muted)] group-hover:text-[var(--primary)]',
                          )}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        {collapsed && (
                          // A real tooltip, not just the native `title` —
                          // several icons in this collapsed rail (the
                          // Statistics group especially) look similar
                          // enough that a label is needed, and native
                          // title tooltips are slow/inconsistent and
                          // never appear on keyboard focus at all.
                          <span
                            role="tooltip"
                            className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--foreground)] px-2.5 py-1.5 text-xs font-semibold text-[var(--background)] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                          >
                            {item.label}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer / user */}
        {user && (
          <div className="shrink-0 border-t border-[var(--border)] p-3">
            <div
              className={clsx(
                'flex items-center gap-3 rounded-xl p-2',
                collapsed && 'justify-center',
              )}
            >
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-solid)] text-xs font-bold text-white ring-1 ring-[var(--primary-hover)]">
                {initials(user.name)}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--surface)]" />
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-[var(--foreground)]">{user.name}</p>
                  <p className="truncate text-[11px] font-medium text-[var(--muted)]">
                    {user.role.replace('_', ' ')}
                  </p>
                </div>
              )}
              <button
                onClick={() => logout().then(() => router.replace('/login'))}
                title="Sign out"
                className="shrink-0 rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-[var(--danger-tint)] hover:text-[var(--danger)]"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
