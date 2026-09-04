'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  ChevronRight,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent, FocusEvent } from 'react';

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

/** Persists which nav section headers are expanded, following the same
 *  localStorage pattern as theme-context.tsx (a namespaced key, read back
 *  in an effect so SSR/first paint never depends on it). */
const SECTION_STORAGE_KEY = 'npix_admin_sidebar_sections';

/** Also used by the dashboard header's user profile chip (see
 *  (dashboard)/layout.tsx), which is why this is exported. */
export function initials(name: string) {
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
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  // The collapsed rail's tooltip used to be a per-item element positioned
  // via `left-full` off the edge of its own <Link> — CSS-only, but that
  // meant it lived inside the same scrolling <nav> the rail's own
  // horizontal-overflow bug came from, so the two couldn't be fixed
  // independently: clipping the nav (needed to actually kill the
  // scrolling) also clipped the tooltip down to a few unreadable pixels.
  // A single `position: fixed` tooltip, positioned in JS from the hovered
  // item's real screen coordinates, has no ancestor to be clipped by at
  // all, so the nav can safely clip and the tooltip can still fully
  // escape it.
  const [hoverTooltip, setHoverTooltip] = useState<{ label: string; top: number; left: number } | null>(null);

  function showTooltip(e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>, label: string) {
    if (!collapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverTooltip({ label, top: rect.top + rect.height / 2, left: rect.right + 8 });
  }

  const activeTitle = useMemo(() => {
    const group = NAV.find((g) => g.items.some((item) => pathname === item.href));
    return group?.title || null;
  }, [pathname]);

  // Accordion: at most one section open at a time, tracked by title
  // (null = all collapsed). Seeded from the active route so the very
  // first render (including SSR) already has the right section open —
  // no flash of every-section-collapsed before an effect corrects it.
  const [openTitle, setOpenTitle] = useState<string | null>(activeTitle);

  // Restores the last section the user had open (e.g. after a reload
  // that lands back on the Dashboard, which has no section of its own).
  // Runs alongside the effect below, in declaration order — when
  // `activeTitle` is set, that effect's setOpenTitle(activeTitle) is the
  // one that wins, so a real route match always takes precedence over a
  // stale stored preference.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SECTION_STORAGE_KEY);
      if (stored === null) return;
      const parsed = JSON.parse(stored);
      if (parsed === null || typeof parsed === 'string') setOpenTitle(parsed);
    } catch {
      // Malformed JSON or storage blocked (private browsing, etc.) —
      // just keep the active-route default from useState above.
    }
  }, []);

  // Auto-expand (and switch to) whichever section contains the current
  // route whenever navigation changes it, so landing on a page (direct
  // link, bookmark, a dashboard shortcut) never hides the very section
  // that explains where you are — even if a different section was left
  // open before. Doesn't fire on every render, only when the route's
  // section actually changes, so manually opening another section to
  // browse it (without navigating) is left alone.
  useEffect(() => {
    if (activeTitle) setOpenTitle(activeTitle);
  }, [activeTitle]);

  function toggleSection(title: string) {
    setOpenTitle((prev) => {
      const next = prev === title ? null : title;
      try {
        localStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

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
          // lg:relative (not lg:static) so the edge-mounted toggle button
          // below has something to anchor to at desktop widths — position:
          // relative behaves identically to static for layout/flex-sibling
          // purposes, it just also establishes a positioning context.
          'fixed inset-y-0 left-0 z-50 flex h-full shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] shadow-xl transition-[width] duration-200 ease-in-out lg:relative lg:shadow-none',
          collapsed ? 'lg:w-[72px]' : 'lg:w-64',
          'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Desktop collapse/expand toggle. Deliberately NOT inside the
            brand header below: at the collapsed width (72px) the header's
            own horizontal padding leaves only ~40px of content room, which
            is just enough for the 40px logo alone — adding a second flex
            child (this button) there doesn't fit and was the actual cause
            of the reported icon clipping / horizontal overflow. Edge-
            mounted like this, it never competes with the logo for space
            and stays in the same, predictable spot in both states. */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-pressed={collapsed}
          className="absolute -right-3.5 top-[18px] z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-md transition hover:border-[var(--primary)] hover:text-[var(--primary)] lg:flex"
        >
          <ChevronsLeft className={clsx('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
        </button>

        {/* Brand header. `lg:justify-center lg:px-2` only take effect at
            the desktop breakpoint, so the mobile drawer (which always
            shows the full logo + its own close button, regardless of the
            desktop-only `collapsed` state) keeps its original layout. */}
        <div
          className={clsx(
            'flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] px-4',
            collapsed && 'lg:justify-center lg:px-2',
          )}
        >
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
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--surface-hover)] lg:hidden"
            title="Close menu"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav. overflow-x-hidden: this rail must never scroll sideways —
            with the tooltip now rendered elsewhere (see hoverTooltip
            below), there's nothing left that legitimately needs to
            escape this container's own width, so clipping it is safe. */}
        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-3">
          {groups.map((group) => {
            // Only real, titled groups are collapsible — the untitled
            // top-level Dashboard link (and every group whenever the
            // whole rail is icon-only collapsed, which has no room for
            // headers at all) always renders fully open, exactly as
            // before this change.
            const collapsible = Boolean(group.title) && !collapsed;
            const isOpen = collapsible ? openTitle === group.title : true;
            return (
              <div key={group.title || group.items[0].href} className="pb-1">
                {group.title && !collapsed && (
                  <button
                    type="button"
                    onClick={() => toggleSection(group.title)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-lg px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-black transition hover:text-[var(--primary)]"
                  >
                    <span>{group.title}</span>
                    <ChevronRight
                      className={clsx(
                        'h-3.5 w-3.5 shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-90',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                )}
                <div
                  className={clsx(
                    'grid transition-[grid-template-rows] duration-200 ease-in-out',
                    collapsible && !isOpen ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
                  )}
                  aria-hidden={collapsible ? !isOpen : undefined}
                  inert={collapsible && !isOpen ? true : undefined}
                >
                  <div className="min-h-0 space-y-0.5 overflow-hidden">
                    {group.items.map((item) => {
                      const active = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onCloseMobile}
                          onMouseEnter={(e) => showTooltip(e, item.label)}
                          onMouseLeave={() => setHoverTooltip(null)}
                          onFocus={(e) => showTooltip(e, item.label)}
                          onBlur={() => setHoverTooltip(null)}
                          title={collapsed ? item.label : undefined}
                          className={clsx(
                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
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
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer / brand banner. The user's identity and sign-out action
            now live in the dashboard header instead (see
            (dashboard)/layout.tsx) — this footer is purely branding, so it
            has no per-user state and renders identically regardless of
            `user`. Two different source images (not one image resized):
            the square icon mark is what actually reads cleanly at the
            collapsed rail's narrow content width — shrinking the wide
            full logo down that far would make its wordmark illegible. */}
        <div className="shrink-0 border-t border-[var(--border)] p-3">
          <div
            className={clsx(
              'flex items-center justify-center rounded-xl bg-[var(--surface-hover)] px-3 py-2.5',
              collapsed && 'px-0',
            )}
          >
            {collapsed ? (
              // eslint-disable-next-line @next/next/no-img-element -- static local asset, matches the brand-header logo above
              <img src="/workalaya-icon.png" alt="Workalaya" className="h-8 w-8 object-contain" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- static local asset
              <img
                src="/workalaya-flogo.png"
                alt="Workalaya"
                className="h-8 w-auto max-w-full object-contain"
              />
            )}
          </div>
        </div>
      </aside>

      {/* Single tooltip for the whole collapsed rail, positioned from real
          screen coordinates rather than CSS relative to its trigger — see
          the hoverTooltip comment above for why. */}
      {collapsed && hoverTooltip && (
        <span
          role="tooltip"
          style={{ top: hoverTooltip.top, left: hoverTooltip.left }}
          className="pointer-events-none fixed z-[60] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--foreground)] px-2.5 py-1.5 text-xs font-semibold text-[var(--background)] shadow-lg"
        >
          {hoverTooltip.label}
        </span>
      )}
    </>
  );
}
