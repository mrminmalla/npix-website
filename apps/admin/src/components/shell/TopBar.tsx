'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, Globe, LogOut, Menu as MenuIcon, Newspaper, Plus, UserPlus } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useAuth, type AdminRole } from '@/lib/auth-context';
import { PUBLIC_SITE_URL } from '@/lib/site';
import { Menu } from '@/components/ui/Menu';
import { NavSearch } from './NavSearch';
import { navForRole, searchItemsFor } from './nav';

const ROLE_LABELS: Record<AdminRole, string> = {
  SUPER_ADMIN: 'Super admin',
  EDITOR: 'Editor',
  VIEWER: 'Viewer',
};

const ICON_BUTTON_BASE =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-control transition-colors';
const ICON_BUTTON = `${ICON_BUTTON_BASE} hover:bg-[var(--shell-hover)]`;
/** White, bordered controls on the teal bar ("+" and the account button). */
const WHITE_CONTROL = 'border border-[var(--shell-control-border)] bg-[var(--surface)] hover:bg-[var(--nav-hover)]';

export function TopBar({ mobileOpen, onOpenMenu }: { mobileOpen: boolean; onOpenMenu: () => void }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  function signOut() {
    logout().then(() => router.replace('/login'));
  }

  // Resource pages open their create form from `?new=1` on mount. When
  // already on that page there's no remount, so force a full navigation.
  function createLink(path: string) {
    return {
      href: `${path}?new=1`,
      onClick: (e: MouseEvent<HTMLElement>) => {
        if (pathname === path) {
          e.preventDefault();
          window.location.assign(`${path}?new=1`);
        }
      },
    };
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 bg-[var(--background)] px-2">
      <div className="flex min-w-0 items-center gap-1 lg:w-[224px] lg:shrink-0">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className={`${ICON_BUTTON} text-[var(--foreground)] lg:hidden`}
        >
          <MenuIcon className="h-4 w-4" />
        </button>
        <Link href="/" className="flex min-w-0 items-center gap-2 rounded-control px-1 py-1">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-white p-1">
            {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, no next/image usage elsewhere in this app */}
            <img src="/npix_black.png" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="text-sm font-semibold text-[var(--foreground)]">NPIX</span>
          <span className="rounded-full bg-[var(--shell-pill)] px-1.5 text-[11px] font-semibold leading-4 text-[var(--foreground)]">
            Admin
          </span>
        </Link>
      </div>

      <div className="hidden flex-1 justify-center md:flex">
        <NavSearch items={searchItemsFor(navForRole(user.role))} />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <Menu
          label="Create new"
          buttonClassName={`${ICON_BUTTON_BASE} ${WHITE_CONTROL} text-[var(--foreground)]`}
          buttonContent={<Plus className="h-4 w-4" aria-hidden="true" />}
          items={[
            { label: 'Add news', icon: Newspaper, ...createLink('/news') },
            { label: 'Add document', icon: FileText, ...createLink('/documents') },
            { label: 'Add member', icon: UserPlus, ...createLink('/members') },
          ]}
        />

        <span className="mx-1 h-5 w-px bg-[var(--shell-divider)]" aria-hidden="true" />

        <a
          href={PUBLIC_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View site (opens in a new tab)"
          className="flex h-8 items-center gap-1.5 rounded-control px-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--shell-hover)]"
        >
          <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">View site</span>
        </a>

        <Menu
          label={`Account: ${user.email}`}
          buttonClassName={`flex h-8 items-center gap-2 rounded-control px-1.5 text-left transition-colors ${WHITE_CONTROL}`}
          buttonContent={
            <>
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--nav-active)] text-xs font-semibold text-[var(--foreground)]"
              >
                {(user.name || user.email).charAt(0).toUpperCase()}
              </span>
              <span className="hidden min-w-0 flex-col lg:flex">
                <span className="max-w-[12rem] truncate text-xs font-medium leading-4 text-[var(--foreground)]">
                  {user.email}
                </span>
                <span className="text-[11px] leading-3 text-[var(--shell-muted)]">{ROLE_LABELS[user.role]}</span>
              </span>
            </>
          }
          header={
            <div className="mb-1 border-b border-[var(--divider)] px-2 pb-2 pt-1">
              <p className="truncate text-sm font-semibold text-[var(--foreground)]">{user.name}</p>
              <p className="truncate text-xs text-[var(--muted)]">
                {user.email} · {ROLE_LABELS[user.role]}
              </p>
            </div>
          }
          items={[{ label: 'Sign out', icon: LogOut, onClick: signOut }]}
        />

        <button
          type="button"
          onClick={signOut}
          aria-label="Sign out"
          title="Sign out"
          className={`${ICON_BUTTON} text-[var(--shell-muted)]`}
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
