import { ReactNode } from 'react';
import clsx from 'clsx';

type Tone = 'neutral' | 'success' | 'danger' | 'info';

const TONE_CLASSES: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  success: 'bg-[var(--success-tint)] text-[var(--success)]',
  danger: 'bg-[var(--danger-tint)] text-[var(--danger)]',
  info: 'bg-[var(--primary-tint)] text-[var(--primary)]',
};

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold',
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}
