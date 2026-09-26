import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'danger' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const VARIANT_CLASSES: Record<Variant, string> = {
  // `--primary-solid` rather than `--accent`: in dark mode the accent is a
  // lighter text-role blue, and white text on it would fail WCAG AA. In
  // light mode the two are the same token (see globals.css).
  primary: 'bg-[var(--primary-solid)] text-white hover:bg-[var(--primary-hover)]',
  // `--danger-solid` (not `--danger`, which is also used as red *text* on
  // light/tinted surfaces elsewhere) — white text on `--danger` failed
  // WCAG AA (3.67:1) in dark mode.
  danger: 'bg-[var(--danger-solid)] text-white hover:bg-[var(--danger-hover)]',
  secondary:
    'border border-[var(--control-border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--nav-hover)]',
  ghost: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--nav-hover)]',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-8 px-3 text-sm',
};

/** Button styling for non-<button> elements (e.g. a next/link <Link>) that
 *  should look like one. */
export function buttonClassName({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return clsx(
    'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-control font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

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
      className={buttonClassName({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
});
