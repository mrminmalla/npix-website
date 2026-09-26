'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export type MenuItem =
  | {
      label: string;
      icon?: LucideIcon;
      /** Internal route, or an external URL when `external` is set. */
      href?: string;
      external?: boolean;
      onClick?: (e: MouseEvent<HTMLElement>) => void;
    }
  | 'divider';

/** Button-triggered dropdown menu: closes on outside click, Escape and
 *  selection; Arrow keys move between items. */
export function Menu({
  label,
  buttonClassName,
  buttonContent,
  header,
  items,
}: {
  /** Accessible name for the trigger button. */
  label: string;
  buttonClassName: string;
  buttonContent: ReactNode;
  /** Optional non-interactive content above the items. */
  header?: ReactNode;
  items: MenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    function handlePointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', handlePointer);
    return () => document.removeEventListener('pointerdown', handlePointer);
  }, [open]);

  function handleMenuKey(e: KeyboardEvent<HTMLDivElement>) {
    const nodes = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    const index = nodes.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nodes[(index + 1) % nodes.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nodes[(index - 1 + nodes.length) % nodes.length]?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  }

  const itemClass =
    'flex h-8 w-full items-center gap-2.5 rounded-control px-2 text-left text-sm text-[var(--foreground)] hover:bg-[var(--nav-hover)] focus-visible:bg-[var(--nav-hover)]';

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        className={buttonClassName}
      >
        {buttonContent}
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKey}
          className="absolute right-0 top-full z-50 mt-1 min-w-52 rounded-card border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg"
        >
          {header}
          {items.map((item, i) => {
            if (item === 'divider') {
              return <div key={`divider-${i}`} role="separator" className="my-1 border-t border-[var(--divider)]" />;
            }
            const Icon = item.icon;
            const content = (
              <>
                {Icon && <Icon className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" />}
                <span className="truncate">{item.label}</span>
              </>
            );
            const onClick = (e: MouseEvent<HTMLElement>) => {
              item.onClick?.(e);
              setOpen(false);
            };
            if (item.href && item.external) {
              return (
                <a
                  key={item.label}
                  role="menuitem"
                  tabIndex={-1}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClick}
                  className={itemClass}
                >
                  {content}
                </a>
              );
            }
            if (item.href) {
              return (
                <Link key={item.label} role="menuitem" tabIndex={-1} href={item.href} onClick={onClick} className={itemClass}>
                  {content}
                </Link>
              );
            }
            return (
              <button key={item.label} type="button" role="menuitem" tabIndex={-1} onClick={onClick} className={itemClass}>
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
