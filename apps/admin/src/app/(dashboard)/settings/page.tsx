'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { useToast } from '@/lib/toast-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface SiteSetting {
  key: string;
  value: string;
  description?: string;
}

export default function SiteSettingsPage() {
  const toast = useToast();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  async function load() {
    setLoading(true);
    try {
      setSettings(await api.get<SiteSetting[]>('/admin/site-settings'));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save(key: string, value: string, description?: string) {
    try {
      await api.put(`/admin/site-settings/${encodeURIComponent(key)}`, { value, description });
      toast.push('Setting saved', 'success');
      await load();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to save';
      setError(message);
      toast.push(message, 'error');
    }
  }

  async function remove(key: string) {
    if (!confirm(`Delete setting "${key}"?`)) return;
    await api.delete(`/admin/site-settings/${encodeURIComponent(key)}`);
    toast.push('Setting deleted', 'success');
    await load();
  }

  return (
    <div>
      <h1 className="text-xl font-extrabold tracking-tight text-[var(--foreground)]">Site Settings</h1>
      <p className="mt-0.5 text-sm text-[var(--muted)]">
        Site-wide configuration such as contact email and social links (e.g.{' '}
        <code className="rounded bg-[var(--surface-hover)] px-1 py-0.5 text-xs">contact_email</code>,{' '}
        <code className="rounded bg-[var(--surface-hover)] px-1 py-0.5 text-xs">social_facebook</code>).
      </p>
      {error && (
        <p className="mt-3 rounded-lg bg-[var(--danger-tint)] px-3 py-2 text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <Card className="mt-4 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newKey.trim()) return;
            save(newKey.trim(), newValue).then(() => {
              setNewKey('');
              setNewValue('');
            });
          }}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input placeholder="key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
          <input placeholder="value" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          <Button type="submit" className="whitespace-nowrap">
            <Plus className="h-4 w-4" />
            Add / Update
          </Button>
        </form>
      </Card>

      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--primary-tint)] text-[11px] font-bold uppercase tracking-wider text-[var(--primary)]">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-center text-[var(--muted)]" colSpan={3}>
                    Loading…
                  </td>
                </tr>
              ) : settings.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-[var(--muted)]" colSpan={3}>
                    No settings yet.
                  </td>
                </tr>
              ) : (
                settings.map((s) => (
                  <tr key={s.key} className="transition hover:bg-[var(--primary-tint)]/40">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-[var(--primary)]">{s.key}</td>
                    <td className="px-4 py-3">
                      <input
                        defaultValue={s.value}
                        onBlur={(e) => e.target.value !== s.value && save(s.key, e.target.value, s.description)}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => remove(s.key)}
                        title="Delete"
                        className="rounded-lg bg-[var(--danger-tint)] p-1.5 text-[var(--danger)] transition hover:opacity-80"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
