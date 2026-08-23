import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'danger' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const VARIANT_CLASSES: Record<Variant, string> = {
  // `--primary-solid`, matching apps/web's button — see the `--primary`
  // comment in globals.css for why this app needs a separate token from
  // the theme-adaptive `--primary` used as text elsewhere.
  primary: 'bg-[var(--primary-solid)] text-white hover:bg-[var(--primary-hover)] shadow-sm',
  // `--danger-solid` (not `--danger`, which is also used as red *text* on
  // light/tinted surfaces elsewhere) — white text on `--danger` failed
  // WCAG AA (3.67:1) in dark mode.
  danger: 'bg-[var(--danger-solid)] text-white hover:bg-[var(--danger-hover)] shadow-sm',
  secondary:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
  ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)]',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={clsx(
        // Pill-shaped, matching apps/web's Button (`rounded-full`) instead
        // of a rounded rectangle.
        'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full font-bold transition disabled:cursor-not-allowed disabled:opacity-60',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
