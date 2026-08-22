'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '@/lib/auth-context';

interface NavItem {
  href: string;
  label: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  /** Restrict this group to specific roles; omit to show everyone. */
  roles?: Array<'SUPER_ADMIN' | 'EDITOR' | 'VIEWER'>;
}

const NAV: NavGroup[] = [
  { title: '', items: [{ href: '/', label: 'Dashboard' }] },
  {
    title: 'Home Page',
    items: [
      { href: '/home/stats', label: 'Stats' },
      { href: '/home/why-npix', label: 'Why NPIX' },
    ],
  },
  {
    title: 'About Us',
    items: [
      { href: '/about/core-values', label: 'Core Values' },
      { href: '/about/timeline', label: 'Timeline' },
      { href: '/about/team', label: 'Leadership Team' },
      { href: '/about/page-copy', label: 'Page Copy' },
    ],
  },
  { title: 'Members', items: [{ href: '/members', label: 'All Members' }] },
  {
    title: 'Statistics',
    items: [
      { href: '/statistics/stats', label: 'Insight & Infra Stats' },
      { href: '/statistics/protocol-adoption', label: 'Protocol Adoption' },
      { href: '/statistics/points-of-presence', label: 'Points of Presence' },
      { href: '/statistics/traffic-panels', label: 'Traffic Panels' },
    ],
  },
  {
    title: 'Documentation',
    items: [
      { href: '/documents', label: 'Documents' },
      { href: '/documents/categories', label: 'Categories' },
      { href: '/faqs', label: 'FAQs' },
    ],
  },
  { title: 'News & Events', items: [{ href: '/news', label: 'All Articles' }] },
  { title: 'Media', items: [{ href: '/media', label: 'Media Library' }] },
  {
    title: 'Settings',
    items: [
      { href: '/settings', label: 'Site Settings' },
      { href: '/settings/users', label: 'Users & Roles' },
    ],
    roles: ['SUPER_ADMIN'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="flex h-full w-60 shrink-0 flex-col gap-6 overflow-y-auto border-r bg-[var(--surface)] p-4">
      <div className="px-2 text-sm font-semibold tracking-wide text-[var(--primary)]">
        NPIX Admin
      </div>
      {NAV.filter((group) => !group.roles || (user && group.roles.includes(user.role))).map(
        (group) => (
          <div key={group.title || 'root'}>
            {group.title && (
              <div className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                {group.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        'block rounded-md px-2 py-1.5 text-sm',
                        active
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                          : 'text-[var(--foreground)] hover:bg-[var(--background)]',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ),
      )}
    </nav>
  );
}
