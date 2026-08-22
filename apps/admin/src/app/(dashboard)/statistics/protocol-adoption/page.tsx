'use client';

import { useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';

interface ProtocolAdoption {
  ipv4SharePercent: number;
  ipv6SharePercent: number;
}

export default function ProtocolAdoptionPage() {
  const [values, setValues] = useState<ProtocolAdoption>({ ipv4SharePercent: 0, ipv6SharePercent: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .get<ProtocolAdoption>('/admin/protocol-adoption')
      .then(setValues)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await api.patch('/admin/protocol-adoption', values);
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-[var(--muted)]">Loading…</p>;

  return (
    <div className="max-w-md">
      <h1 className="text-lg font-semibold">Protocol Adoption</h1>
      <p className="text-sm text-[var(--muted)]">
        Static IPv4/IPv6 share percentages shown on the Statistics page. Session counts next to
        them are always computed live from the Members list and are not editable here.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-lg border bg-[var(--surface)] p-4">
        <label className="block text-sm font-medium">
          IPv4 share (%)
          <input
            type="number"
            min={0}
            max={100}
            required
            value={values.ipv4SharePercent}
            onChange={(e) => setValues((v) => ({ ...v, ipv4SharePercent: Number(e.target.value) }))}
            className="mt-1"
          />
        </label>
        <label className="block text-sm font-medium">
          IPv6 share (%)
          <input
            type="number"
            min={0}
            max={100}
            required
            value={values.ipv6SharePercent}
            onChange={(e) => setValues((v) => ({ ...v, ipv6SharePercent: Number(e.target.value) }))}
            className="mt-1"
          />
        </label>
        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
        {saved && <p className="text-sm text-green-600">Saved.</p>}
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </div>
  );
}
