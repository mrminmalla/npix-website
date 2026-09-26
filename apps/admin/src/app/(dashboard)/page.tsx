'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  FileText,
  Globe,
  ImageUp,
  MapPin,
  Network,
  Newspaper,
  Percent,
  Radio,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { api } from '@/lib/api';
import { PUBLIC_SITE_URL } from '@/lib/site';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { buttonClassName } from '@/components/ui/Button';

interface MemberStats {
  totalMembers: number;
  uniqueAsns: number;
  datahubEnabled: number;
  ipv4Sessions: number;
  ipv6Sessions: number;
}

interface ContentRow {
  id: string;
  updatedAt: string;
  title?: string;
  name?: string;
}

type ResourceKey = 'members' | 'news' | 'documents';

const RESOURCES: Record<ResourceKey, { endpoint: string; href: string; type: string }> = {
  members: { endpoint: '/admin/members', href: '/members', type: 'Member' },
  news: { endpoint: '/admin/news-events', href: '/news', type: 'News' },
  documents: { endpoint: '/admin/documents', href: '/documents', type: 'Document' },
};

/** undefined = still loading, null = failed to load. */
type Loadable<T> = T | null | undefined;

const QUICK_ACCESS: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: '/members?new=1', label: 'Add a member', icon: UserPlus },
  { href: '/media', label: 'Upload media', icon: ImageUp },
  { href: '/statistics/points-of-presence', label: 'Points of presence', icon: MapPin },
  { href: '/statistics/traffic-panels', label: 'Traffic panels', icon: Radio },
  { href: '/statistics/protocol-adoption', label: 'Protocol adoption', icon: Percent },
];

const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const RELATIVE_STEPS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
];

function timeAgo(iso: string) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  for (const [unit, size] of RELATIVE_STEPS) {
    if (Math.abs(seconds) >= size) return relativeTime.format(Math.round(seconds / size), unit);
  }
  return 'just now';
}

function Skeleton({ className }: { className: string }) {
  return <span aria-hidden="true" className={`block animate-pulse rounded bg-[var(--divider)] ${className}`} />;
}

function StatCard({
  href,
  label,
  icon: Icon,
  value,
  footer,
  footerMuted,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  value: Loadable<string | number>;
  footer: Loadable<string>;
  footerMuted?: boolean;
}) {
  return (
    <Link
      href={href}
      className="block rounded-card border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--control-border)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] text-[var(--muted)]">{label}</span>
        <Icon className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
      </div>
      <div className="mt-1 h-9 text-[28px] font-semibold leading-9 text-[var(--foreground)]">
        {value === undefined ? <Skeleton className="mt-1.5 h-6 w-16" /> : (value ?? '—')}
      </div>
      <div className={`mt-2 h-5 truncate text-sm ${footerMuted ? 'text-[var(--muted)]' : 'text-[var(--accent)]'}`}>
        {footer === undefined ? <Skeleton className="mt-1 h-3 w-40" /> : footer}
      </div>
    </Link>
  );
}

function ListRowSkeleton() {
  return (
    <li className="flex h-10 items-center gap-4 px-4">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="ml-auto h-3 w-12" />
    </li>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Loadable<MemberStats>>(undefined);
  const [lists, setLists] = useState<Record<ResourceKey, Loadable<ContentRow[]>>>({
    members: undefined,
    news: undefined,
    documents: undefined,
  });

  useEffect(() => {
    api
      .get<MemberStats>('/admin/members/stats')
      .then(setStats)
      .catch(() => setStats(null));
    for (const key of Object.keys(RESOURCES) as ResourceKey[]) {
      api
        .get<ContentRow[]>(RESOURCES[key].endpoint)
        .then((rows) => setLists((prev) => ({ ...prev, [key]: rows })))
        .catch(() => setLists((prev) => ({ ...prev, [key]: null })));
    }
  }, []);

  const count = (key: ResourceKey) => (lists[key] === undefined ? undefined : (lists[key]?.length ?? null));

  const ipv6Percent =
    stats === undefined
      ? undefined
      : stats && stats.totalMembers > 0
        ? `${Math.round((stats.ipv6Sessions / stats.totalMembers) * 100)}%`
        : null;
  const ipv6Footer =
    stats === undefined
      ? undefined
      : stats
        ? `${stats.ipv6Sessions} of ${stats.totalMembers} members peer over IPv6`
        : 'Member stats unavailable';

  const listsLoading = Object.values(lists).some((l) => l === undefined);
  const recent = (Object.keys(RESOURCES) as ResourceKey[])
    .flatMap((key) => (lists[key] ?? []).map((row) => ({ ...row, key })))
    .filter((row) => row.updatedAt)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 border-b border-[var(--divider)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Dashboard</h1>
          <p className="mt-1 text-[var(--muted)]">Overview of the content powering the NPIX public website.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link href="/documents?new=1" className={buttonClassName({ variant: 'secondary' })}>
            Add document
          </Link>
          <Link href="/news?new=1" className={buttonClassName({ variant: 'primary' })}>
            Add news
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          href="/members"
          label="Members"
          icon={Network}
          value={count('members')}
          footer="View all members →"
        />
        <StatCard
          href="/news"
          label="News & events"
          icon={Newspaper}
          value={count('news')}
          footer="Manage posts →"
        />
        <StatCard
          href="/documents"
          label="Documents"
          icon={FileText}
          value={count('documents')}
          footer="Manage documents →"
        />
        <StatCard
          href="/statistics/protocol-adoption"
          label="IPv6 adoption"
          icon={Percent}
          value={ipv6Percent}
          footer={ipv6Footer}
          footerMuted
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col gap-6">
          <Card className="overflow-hidden">
            <CardHeader
              title="Live member stats"
              badge={<Badge>Read-only</Badge>}
              action={
                <span className="hidden text-xs text-[var(--muted)] sm:inline">Computed from the members table</span>
              }
            />
            <ul className="divide-y divide-[var(--divider)]">
              {stats === undefined ? (
                Array.from({ length: 5 }, (_, i) => <ListRowSkeleton key={i} />)
              ) : stats === null ? (
                <li className="px-4 py-2.5 text-[var(--muted)]">Member stats couldn’t be loaded.</li>
              ) : (
                <>
                  <ValueRow label="Total members" value={stats.totalMembers} />
                  <ValueRow label="Unique ASNs" value={stats.uniqueAsns} />
                  <ProgressRow label="Datahub enabled" value={stats.datahubEnabled} total={stats.totalMembers} />
                  <ProgressRow label="IPv4 sessions" value={stats.ipv4Sessions} total={stats.totalMembers} />
                  <ProgressRow label="IPv6 sessions" value={stats.ipv6Sessions} total={stats.totalMembers} />
                </>
              )}
            </ul>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader title="Recent content updates" />
            <ul className="divide-y divide-[var(--divider)]">
              {listsLoading ? (
                Array.from({ length: 5 }, (_, i) => <ListRowSkeleton key={i} />)
              ) : recent.length === 0 ? (
                <li className="px-4 py-2.5 text-[var(--muted)]">No content yet.</li>
              ) : (
                recent.map((row) => (
                  <li key={`${row.key}-${row.id}`}>
                    <Link
                      href={RESOURCES[row.key].href}
                      className="flex h-10 items-center gap-3 px-4 transition-colors hover:bg-[var(--surface-subtle)]"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span className="min-w-0 flex-1 truncate">
                        <span className="text-[var(--foreground)]">{row.title ?? row.name ?? 'Untitled'}</span>
                        <span className="text-[var(--muted)]"> · {RESOURCES[row.key].type}</span>
                      </span>
                      <time
                        dateTime={row.updatedAt}
                        title={new Date(row.updatedAt).toLocaleString()}
                        className="shrink-0 text-xs text-[var(--muted)]"
                      >
                        {timeAgo(row.updatedAt)}
                      </time>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </Card>
        </div>

        <Card className="self-start p-4">
          <h2 className="mb-2 text-[15px] font-semibold text-[var(--foreground)]">Quick access</h2>
          <ul>
            {QUICK_ACCESS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="-mx-2 flex h-8 items-center gap-2.5 rounded-control px-2 text-[var(--foreground)] transition-colors hover:bg-[var(--nav-hover)]"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
            <li role="separator" className="my-2 border-t border-[var(--divider)]" />
            <li>
              <a
                href={PUBLIC_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="-mx-2 flex h-8 items-center gap-2.5 rounded-control px-2 text-[var(--foreground)] transition-colors hover:bg-[var(--nav-hover)]"
              >
                <Globe className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />
                Open public website
                <ExternalLink className="ml-auto h-3.5 w-3.5 text-[var(--muted)]" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function ValueRow({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex items-center gap-4 px-4 py-2.5">
      <span className="text-[var(--foreground-secondary)]">{label}</span>
      <span className="ml-auto font-mono tabular-nums text-[var(--foreground)]">{value}</span>
    </li>
  );
}

function ProgressRow({ label, value, total }: { label: string; value: number; total: number }) {
  const percent = total > 0 ? Math.min(100, (value / total) * 100) : 0;
  return (
    <li className="flex items-center gap-4 px-4 py-2.5">
      <span className="w-40 shrink-0 text-[var(--foreground-secondary)]">{label}</span>
      <span aria-hidden="true" className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--divider)]">
        <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${percent}%` }} />
      </span>
      <span className="shrink-0 text-right font-mono tabular-nums text-[var(--foreground)]">
        {value} <span className="text-[var(--muted)]">/ {total}</span>
      </span>
    </li>
  );
}
