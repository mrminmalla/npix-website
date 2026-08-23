'use client';

import { useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import { useToast } from '@/lib/toast-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ProtocolAdoption {
  ipv4SharePercent: number;
  ipv6SharePercent: number;
}

export default function ProtocolAdoptionPage() {
  const toast = useToast();
  const [values, setValues] = useState<ProtocolAdoption>({ ipv4SharePercent: 0, ipv6SharePercent: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    try {
      await api.patch('/admin/protocol-adoption', values);
      toast.push('Protocol adoption saved', 'success');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to save';
      setError(message);
      toast.push(message, 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-[var(--muted)]">Loading…</p>;

  return (
    <div className="max-w-md">
      <h1 className="text-xl font-extrabold tracking-tight text-[var(--foreground)]">Protocol Adoption</h1>
      <p className="mt-0.5 text-sm text-[var(--muted)]">
        Static IPv4/IPv6 share percentages shown on the Statistics page. Session counts next to
        them are always computed live from the Members list and are not editable here.
      </p>
      <Card className="mt-4 p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-semibold text-[var(--foreground)]">
            IPv4 share (%)
            <input
              type="number"
              min={0}
              max={100}
              required
              value={values.ipv4SharePercent}
              onChange={(e) => setValues((v) => ({ ...v, ipv4SharePercent: Number(e.target.value) }))}
              className="mt-1.5"
            />
          </label>
          <label className="block text-sm font-semibold text-[var(--foreground)]">
            IPv6 share (%)
            <input
              type="number"
              min={0}
              max={100}
              required
              value={values.ipv6SharePercent}
              onChange={(e) => setValues((v) => ({ ...v, ipv6SharePercent: Number(e.target.value) }))}
              className="mt-1.5"
            />
          </label>
          {error && <p className="text-sm font-medium text-[var(--danger)]">{error}</p>}
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
