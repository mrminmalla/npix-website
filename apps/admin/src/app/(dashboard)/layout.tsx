'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Sidebar, NAV_LABELS, initials } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-sm text-[var(--muted)]">
        Loading…
      </div>
    );
  }

  const currentLabel = NAV_LABELS[pathname] ?? (pathname === '/' ? 'Dashboard' : '');

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/95 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              title="Open menu"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--surface-hover)] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
              <span>Admin</span>
              {currentLabel && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-bold text-[var(--foreground)]">{currentLabel}</span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {/* User profile: moved here from the sidebar footer (which is
                now pure branding) so identity/role/sign-out live with the
                rest of the header's top-right actions. Name/role text
                hides below sm so the chip stays compact next to the
                breadcrumb on narrow headers — the avatar alone still
                identifies the account. */}
            <div className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-1.5 sm:bg-[var(--surface-hover)]">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-solid)] text-[11px] font-bold text-white ring-1 ring-[var(--primary-hover)]">
                {initials(user.name)}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--surface)]" />
              </div>
              <div className="hidden min-w-0 sm:block">
                <p className="max-w-[9rem] truncate text-xs font-bold leading-tight text-[var(--foreground)]">
                  {user.name}
                </p>
                <p className="truncate text-[10px] font-semibold uppercase leading-tight tracking-wide text-[var(--muted)]">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            </div>

            <button
              onClick={() => logout().then(() => router.replace('/login'))}
              title="Sign out"
              aria-label="Sign out"
              className="shrink-0 rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--danger-tint)] hover:text-[var(--danger)]"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
