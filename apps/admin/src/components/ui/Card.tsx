import { ReactNode } from 'react';
import clsx from 'clsx';

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={clsx('rounded-card border border-[var(--border)] bg-[var(--surface)]', className)}>
      {children}
    </div>
  );
}

/** Tinted header strip for a Card: title, optional inline badge, and an
 *  optional right-aligned slot (a hint or a link). Put it inside a Card
 *  with `overflow-hidden` so the strip follows the card's radius. */
export function CardHeader({
  title,
  badge,
  action,
}: {
  title: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-11 items-center gap-2 border-b border-[var(--divider)] bg-[var(--surface-subtle)] px-4 py-2.5">
      <h2 className="truncate text-[15px] font-semibold text-[var(--foreground)]">{title}</h2>
      {badge}
      {action && <div className="ml-auto shrink-0">{action}</div>}
    </div>
  );
}
