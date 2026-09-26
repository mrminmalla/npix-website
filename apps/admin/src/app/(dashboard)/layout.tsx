'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/shell/TopBar';
import { breadcrumbFor } from '@/components/shell/nav';

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

  const crumbs = [{ label: 'Admin', href: '/' }, ...breadcrumbFor(pathname)];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--background)]">
      <TopBar mobileOpen={mobileOpen} onOpenMenu={() => setMobileOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

        <div className="mb-2 ml-2 mr-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-panel border border-[var(--panel-border)] bg-[var(--surface)] lg:ml-0">
          <nav
            aria-label="Breadcrumb"
            className="flex h-11 shrink-0 items-center border-b border-[var(--divider)] px-4 text-[13px] sm:px-8"
          >
            <ol className="flex min-w-0 items-center gap-2">
              {crumbs.map((crumb, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-[var(--muted)]">
                        /
                      </span>
                    )}
                    {last ? (
                      <span aria-current="page" className="truncate font-semibold text-[var(--foreground)]">
                        {crumb.label}
                      </span>
                    ) : crumb.href ? (
                      <Link href={crumb.href} className="truncate text-[var(--muted)] hover:text-[var(--foreground)] hover:underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="truncate text-[var(--muted)]">{crumb.label}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <main className="flex-1 overflow-y-auto px-4 pb-8 pt-6 sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
