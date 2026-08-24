'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title="Toggle dark/light mode"
      aria-label="Toggle dark/light mode"
      aria-pressed={theme === 'dark'}
      className="rounded-xl p-2 text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
