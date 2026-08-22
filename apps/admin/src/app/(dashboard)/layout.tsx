'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-[var(--muted)]">Loading…</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-[var(--surface)] px-6 py-3">
          <div />
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[var(--muted)]">
              {user.name} · <span className="uppercase">{user.role}</span>
            </span>
            <button
              onClick={() => logout().then(() => router.replace('/login'))}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-[var(--background)]"
            >
              Sign out
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
