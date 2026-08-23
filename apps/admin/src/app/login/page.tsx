'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { ApiError, useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(identifier, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to sign in');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card-hover)]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] text-[11px] font-extrabold tracking-wider text-white shadow-md ring-2 ring-[var(--primary)]">
            NPIX
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-[var(--foreground)]">NPIX Admin</h1>
            <p className="text-xs font-medium text-[var(--muted)]">Nepal Internet Exchange</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-[var(--muted)]">Sign in to manage site content.</p>

        <label className="mt-6 block text-sm font-semibold text-[var(--foreground)]">
          Username or Email
          <input
            type="text"
            required
            autoComplete="username"
            placeholder="Enter username or email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1.5"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-[var(--foreground)]">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5"
          />
        </label>

        {error && (
          <p className="mt-4 rounded-lg bg-[var(--danger-tint)] px-3 py-2 text-sm font-medium text-[var(--danger)]">
            {error}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="mt-6 w-full">
          <LogIn className="h-4 w-4" />
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
