'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Network, Newspaper, FileText, Percent, ArrowUpRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';

interface MemberStats {
  totalMembers: number;
  uniqueAsns: number;
  datahubEnabled: number;
  ipv4Sessions: number;
  ipv6Sessions: number;
}

const TILES = [
  { href: '/members', label: 'Members', icon: Network, endpoint: '/admin/members' },
  { href: '/news', label: 'News & Events', icon: Newspaper, endpoint: '/admin/news-events' },
  { href: '/documents', label: 'Documents', icon: FileText, endpoint: '/admin/documents' },
] as const;

export default function DashboardPage() {
  const [stats, setStats] = useState<MemberStats | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    api.get<MemberStats>('/admin/members/stats').then(setStats);
    Promise.all(
      TILES.map(async (tile) => {
        const rows = await api.get<unknown[]>(tile.endpoint).catch(() => []);
        return [tile.href, rows.length] as const;
      }),
    ).then((entries) => setCounts(Object.fromEntries(entries)));
  }, []);

  const ipv6Percent =
    stats && stats.totalMembers > 0 ? Math.round((stats.ipv6Sessions / stats.totalMembers) * 100) : null;

  return (
    <div className="space-y-6">
      <Card className="flex flex-col justify-between gap-3 p-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">Dashboard</h1>
          <p className="mt-1 text-sm font-medium text-[var(--muted)]">
            Overview of the content powering the NPIX public website.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link key={tile.href} href={tile.href}>
              <Card className="group h-full p-5 transition hover:shadow-[var(--shadow-card-hover)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    {tile.label}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-tint)] text-[var(--primary)] transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[var(--foreground)]">
                    {counts[tile.href] ?? '—'}
                  </span>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] opacity-0 transition group-hover:opacity-100">
                  Manage <ArrowUpRight className="h-3 w-3" />
                </span>
              </Card>
            </Link>
          );
        })}

        <Link href="/statistics/protocol-adoption">
          <Card className="group h-full p-5 transition hover:shadow-[var(--shadow-card-hover)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                IPv6 Adoption
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-tint)] text-[var(--accent)] transition group-hover:scale-110">
                <Percent className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[var(--foreground)]">
                {ipv6Percent === null ? '—' : `${ipv6Percent}%`}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium text-[var(--muted)]">
              {stats ? `${stats.ipv6Sessions} of ${stats.totalMembers} members peer over IPv6` : 'Loading…'}
            </p>
          </Card>
        </Link>
      </div>

      {stats && (
        <Card className="p-6">
          <h2 className="text-sm font-bold text-[var(--foreground)]">Live member stats</h2>
          <p className="text-xs text-[var(--muted)]">
            Computed directly from the members table — read-only, shown for reference.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              ['Total members', stats.totalMembers],
              ['Unique ASNs', stats.uniqueAsns],
              ['Datahub enabled', stats.datahubEnabled],
              ['IPv4 sessions', stats.ipv4Sessions],
              ['IPv6 sessions', stats.ipv6Sessions],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-xl bg-[var(--surface-hover)] p-4">
                <p className="text-xl font-extrabold text-[var(--foreground)]">{value}</p>
                <p className="text-xs font-medium text-[var(--muted)]">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
