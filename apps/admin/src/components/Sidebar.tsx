'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ChevronRight, CircleHelp, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FocusEvent, MouseEvent, ReactNode } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { ADMIN_HELP_URL } from '@/lib/site';
import { activeGroupLabel, navForRole, type NavEntry } from '@/components/shell/nav';

/** Persists which nav group is expanded, following the same localStorage
 *  pattern as theme-context.tsx (a namespaced key). */
const SECTION_STORAGE_KEY = 'npix_admin_sidebar_sections';
const COLLAPSED_STORAGE_KEY = 'npix_admin_sidebar_collapsed';

// Each state sets its own text color and hover fill (rather than
// overriding a base one) so no two conflicting utilities share an element.
// Focus rings come from the global :focus-visible rule in globals.css
// (keyboard only, 2px accent with a 2px offset).
const ITEM_BASE = 'flex w-full items-center rounded-control text-sm transition-colors';
const ITEM_STATES = {
  idle: 'text-[var(--foreground-secondary)] hover:bg-[var(--shell-hover)]',
  // The current page: same solid fill and hover as the primary button.
  active: 'bg-[var(--primary-solid)] font-semibold text-white hover:bg-[var(--primary-hover)]',
  // A group containing the current page: accent text/icon, no fill.
  activeGroup: 'font-semibold text-[var(--shell-accent-text)] hover:bg-[var(--shell-hover)]',
};

function itemClass(state: keyof typeof ITEM_STATES, ...extra: string[]) {
  return clsx(ITEM_BASE, ITEM_STATES[state], ...extra);
}

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked (private browsing, etc.) — the preference just won't persist.
  }
}

/** Member count for the Members nav pill. Re-fetched on navigation so it
 *  catches up after members are added or removed. */
function useMembersCount(pathname: string) {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let cancelled = false;
    api
      .get<unknown[]>('/admin/members')
      .then((rows) => !cancelled && setCount(rows.length))
      .catch(() => !cancelled && setCount(null));
    return () => {
      cancelled = true;
    };
  }, [pathname]);
  return count;
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
  const membersCount = useMembersCount(pathname);

  // The sidebar only ever mounts client-side (the dashboard layout renders a
  // loading screen until auth resolves), so reading storage in the
  // initializer is safe and avoids a flash of the expanded sidebar.
  const [collapsed, setCollapsed] = useState(() => readStorage(COLLAPSED_STORAGE_KEY) === '1');

  // The collapsed rail's tooltip is a single `position: fixed` element
  // positioned from the hovered item's screen coordinates, so the nav can
  // clip its own overflow without clipping the tooltip.
  const [hoverTooltip, setHoverTooltip] = useState<{ label: string; top: number; left: number } | null>(null);

  const activeGroup = activeGroupLabel(pathname);

  // Accordion: at most one group open at a time (null = all closed).
  // Seeded from the active route, falling back to the last group the user
  // had open (e.g. after a reload that lands back on the Dashboard).
  const [openGroup, setOpenGroup] = useState<string | null>(() => {
    if (activeGroup) return activeGroup;
    try {
      const parsed = JSON.parse(readStorage(SECTION_STORAGE_KEY) ?? 'null');
      return typeof parsed === 'string' ? parsed : null;
    } catch {
      return null;
    }
  });

  // Landing on a page (direct link, search, dashboard shortcut) always
  // opens the group that contains it. Only fires when the route's group
  // changes, so manually opening another group to browse it is left alone.
  useEffect(() => {
    if (activeGroup) setOpenGroup(activeGroup);
  }, [activeGroup]);

  function toggleGroup(label: string) {
    setOpenGroup((prev) => {
      const next = prev === label ? null : label;
      writeStorage(SECTION_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function toggleCollapsed() {
    setHoverTooltip(null);
    setCollapsed((c) => {
      writeStorage(COLLAPSED_STORAGE_KEY, c ? '0' : '1');
      return !c;
    });
  }

  // Icon-only rail applies at desktop widths only; the mobile drawer always
  // shows the full sidebar.
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches);
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mql.matches);
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
  const rail = collapsed && isDesktop;

  function showTooltip(e: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>, label: string) {
    if (!rail) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverTooltip({ label, top: rect.top + rect.height / 2, left: rect.right + 8 });
  }

  const tooltipHandlers = (label: string) => ({
    onMouseEnter: (e: MouseEvent<HTMLElement>) => showTooltip(e, label),
    onMouseLeave: () => setHoverTooltip(null),
    onFocus: (e: FocusEvent<HTMLElement>) => showTooltip(e, label),
    onBlur: () => setHoverTooltip(null),
  });

  const entries = navForRole(user?.role);

  function countPill(entry: NavEntry, active: boolean): ReactNode {
    if (entry.href !== '/members' || membersCount === null) return null;
    return (
      <span
        className={clsx(
          'ml-auto rounded-full px-1.5 text-xs leading-4',
          active ? 'bg-white/20 text-white' : 'bg-[var(--shell-pill)] text-[var(--foreground)]',
        )}
      >
        {membersCount}
      </span>
    );
  }

  function renderRailEntry(entry: NavEntry) {
    // In the rail a group has no room to expand, so its icon jumps to the
    // group's first page instead.
    const href = entry.href ?? entry.children![0].href;
    const active = pathname === entry.href;
    const activeGroupEntry = !entry.href && activeGroup === entry.label;
    const Icon = entry.icon;
    return (
      <li key={entry.label}>
        <Link
          href={href}
          aria-label={entry.label}
          aria-current={active ? 'page' : undefined}
          {...tooltipHandlers(entry.label)}
          className={itemClass(active ? 'active' : activeGroupEntry ? 'activeGroup' : 'idle', 'h-8 justify-center')}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </li>
    );
  }

  function renderEntry(entry: NavEntry) {
    const Icon = entry.icon;

    if (entry.href) {
      const active = pathname === entry.href;
      return (
        <li key={entry.label}>
          <Link
            href={entry.href}
            onClick={onCloseMobile}
            aria-current={active ? 'page' : undefined}
            className={itemClass(active ? 'active' : 'idle', 'h-8 gap-2.5 px-2')}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{entry.label}</span>
            {countPill(entry, active)}
          </Link>
        </li>
      );
    }

    const isOpen = openGroup === entry.label;
    const groupId = `nav-group-${entry.label.toLowerCase().replace(/[^a-z]+/g, '-')}`;
    return (
      <li key={entry.label}>
        <button
          type="button"
          onClick={() => toggleGroup(entry.label)}
          aria-expanded={isOpen}
          aria-controls={groupId}
          className={itemClass(activeGroup === entry.label ? 'activeGroup' : 'idle', 'h-8 gap-2.5 px-2 text-left')}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{entry.label}</span>
          <ChevronRight
            className={clsx(
              'ml-auto h-4 w-4 shrink-0 transition-transform duration-200',
              activeGroup === entry.label ? 'text-[var(--shell-accent-text)]' : 'text-[var(--shell-muted)]',
              isOpen && 'rotate-90',
            )}
            aria-hidden="true"
          />
        </button>
        <div
          id={groupId}
          className={clsx(
            'grid transition-[grid-template-rows] duration-200 ease-in-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
          inert={!isOpen ? true : undefined}
        >
          <ul className="min-h-0 overflow-hidden">
            {entry.children!.map((child) => {
              const active = pathname === child.href;
              return (
                <li key={child.href} className="pt-0.5">
                  <Link
                    href={child.href}
                    onClick={onCloseMobile}
                    aria-current={active ? 'page' : undefined}
                    className={itemClass(active ? 'active' : 'idle', 'h-[30px] pl-[34px] pr-2')}
                  >
                    <span className="truncate">{child.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onCloseMobile} aria-hidden="true" />
      )}

      <aside
        aria-label="Admin navigation"
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex w-[260px] shrink-0 flex-col bg-[var(--background)] transition-[transform,width] duration-200 ease-in-out',
          'lg:static lg:z-auto lg:translate-x-0 lg:shadow-none',
          rail ? 'lg:w-14' : 'lg:w-60',
          mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full',
        )}
      >
        {/* Mobile drawer header — at desktop widths the top bar carries the brand. */}
        <div className="flex h-12 shrink-0 items-center justify-between px-3 lg:hidden">
          <span className="text-sm font-semibold text-[var(--foreground)]">NPIX Admin</span>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-control text-[var(--shell-muted)] hover:bg-[var(--shell-hover)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className={clsx('flex-1 overflow-y-auto overflow-x-hidden py-2', rail ? 'px-2' : 'px-2 lg:pl-2 lg:pr-3')}>
          {!rail && <p className="flex h-8 items-center px-2 text-sm font-semibold text-[var(--foreground)]">Admin area</p>}
          <ul className="space-y-0.5">{entries.map((entry) => (rail ? renderRailEntry(entry) : renderEntry(entry)))}</ul>
        </nav>

        <div className={clsx('shrink-0 space-y-0.5 pb-2', rail ? 'px-2' : 'px-2 lg:pl-2 lg:pr-3')}>
          <a
            href={ADMIN_HELP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={rail ? 'Help' : undefined}
            {...tooltipHandlers('Help')}
            className={itemClass('idle', 'h-8', rail ? 'justify-center' : 'gap-2.5 px-2')}
          >
            <CircleHelp className="h-4 w-4 shrink-0" aria-hidden="true" />
            {!rail && <span>Help</span>}
          </a>
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={rail ? 'Expand sidebar' : undefined}
            aria-pressed={collapsed}
            {...tooltipHandlers('Expand sidebar')}
            className={itemClass('idle', 'hidden h-8 lg:flex', rail ? 'justify-center' : 'gap-2.5 px-2 text-left')}
          >
            {rail ? (
              <PanelLeftOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Collapse sidebar</span>
              </>
            )}
          </button>
          {!rail && (
            <p className="mt-2 border-t border-[var(--shell-divider)] px-2 pt-3 text-xs text-[var(--shell-muted)]">
              Built by Workalaya R&amp;D
            </p>
          )}
        </div>
      </aside>

      {rail && hoverTooltip && (
        <span
          role="tooltip"
          style={{ top: hoverTooltip.top, left: hoverTooltip.left }}
          className="pointer-events-none fixed z-[60] -translate-y-1/2 whitespace-nowrap rounded-control bg-[var(--foreground)] px-2 py-1 text-xs font-medium text-[var(--background)] shadow-lg"
        >
          {hoverTooltip.label}
        </span>
      )}
    </>
  );
}
