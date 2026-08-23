'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Sidebar, NAV_LABELS } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
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

          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
