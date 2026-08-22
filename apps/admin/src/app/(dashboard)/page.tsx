'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface MemberStats {
  totalMembers: number;
  uniqueAsns: number;
  datahubEnabled: number;
  ipv4Sessions: number;
  ipv6Sessions: number;
}

const TILES = [
  { href: '/members', label: 'Members' },
  { href: '/news', label: 'News & Events' },
  { href: '/documents', label: 'Documents' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<MemberStats | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    api.get<MemberStats>('/admin/members/stats').then(setStats);
    Promise.all(
      TILES.map(async (tile) => {
        const endpoint = tile.href === '/members' ? '/admin/members' : tile.href === '/news' ? '/admin/news-events' : '/admin/documents';
        const rows = await api.get<unknown[]>(endpoint).catch(() => []);
        return [tile.href, rows.length] as const;
      }),
    ).then((entries) => setCounts(Object.fromEntries(entries)));
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <p className="text-sm text-[var(--muted)]">Overview of NPIX site content.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TILES.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className="rounded-lg border bg-[var(--surface)] p-4 hover:border-[var(--accent)]"
          >
            <p className="text-2xl font-semibold">{counts[tile.href] ?? '—'}</p>
            <p className="text-sm text-[var(--muted)]">{tile.label}</p>
          </Link>
        ))}
      </div>

      {stats && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Live member stats (computed, read-only)
          </h2>
          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              ['Total members', stats.totalMembers],
              ['Unique ASNs', stats.uniqueAsns],
              ['Datahub enabled', stats.datahubEnabled],
              ['IPv4 sessions', stats.ipv4Sessions],
              ['IPv6 sessions', stats.ipv6Sessions],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-lg border bg-[var(--surface)] p-4">
                <p className="text-xl font-semibold">{value}</p>
                <p className="text-xs text-[var(--muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
