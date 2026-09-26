'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { NavSearchItem } from './nav';

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}

/** "Search or go to…" box. There is no search backend, so it filters the
 *  admin's own pages client-side and jumps to the chosen one. Pressing "/"
 *  anywhere outside a form field focuses it. */
export function NavSearch({ items }: { items: NavSearchItem[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.group?.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    function handleKey(e: globalThis.KeyboardEvent) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      e.preventDefault();
      inputRef.current?.focus();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  function go(item: NavSearchItem | undefined) {
    if (!item) return;
    router.push(item.href);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[activeIndex]);
    } else if (e.key === 'Escape') {
      if (query) setQuery('');
      else inputRef.current?.blur();
    }
  }

  const showList = open && results.length > 0;
  const optionId = (i: number) => `${listId}-option-${i}`;

  return (
    <div className="relative w-full max-w-[424px]">
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-label="Search or go to"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList ? optionId(activeIndex) : undefined}
        placeholder="Search or go to…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        className="peer h-8 border-[var(--control-border)] bg-[var(--surface)] pl-8 pr-8 text-sm placeholder:text-[var(--muted)]"
      />
      <kbd
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-[var(--border)] px-1.5 text-xs leading-4 text-[var(--muted)] peer-focus:hidden"
      >
        /
      </kbd>
      <ul
        id={listId}
        role="listbox"
        aria-label="Pages"
        hidden={!showList}
        className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-card border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg"
      >
        {results.map((item, i) => (
          <li
            key={item.href}
            id={optionId(i)}
            role="option"
            aria-selected={i === activeIndex}
            // mousedown (not click) + preventDefault keeps focus in the
            // input, so its blur handler doesn't close the list first.
            onMouseDown={(e) => {
              e.preventDefault();
              go(item);
            }}
            onMouseEnter={() => setActiveIndex(i)}
            className={clsx(
              'flex h-8 cursor-pointer items-center justify-between gap-3 rounded-control px-2 text-sm',
              i === activeIndex && 'bg-[var(--nav-hover)]',
            )}
          >
            <span className="truncate text-[var(--foreground)]">{item.label}</span>
            {item.group && <span className="shrink-0 text-xs text-[var(--muted)]">{item.group}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
