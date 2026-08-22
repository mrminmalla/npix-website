'use client';

import { useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';

interface SiteSetting {
  key: string;
  value: string;
  description?: string;
}

export default function SiteSettingsPage() {
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
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save');
    }
  }

  async function remove(key: string) {
    if (!confirm(`Delete setting "${key}"?`)) return;
    await api.delete(`/admin/site-settings/${encodeURIComponent(key)}`);
    await load();
  }

  return (
    <div>
      <h1 className="text-lg font-semibold">Site Settings</h1>
      <p className="text-sm text-[var(--muted)]">
        Site-wide configuration such as contact email and social links (e.g.{' '}
        <code>contact_email</code>, <code>social_facebook</code>).
      </p>
      {error && <p className="mt-2 text-sm text-[var(--danger)]">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newKey.trim()) return;
          save(newKey.trim(), newValue).then(() => {
            setNewKey('');
            setNewValue('');
          });
        }}
        className="mt-4 flex gap-2 rounded-lg border bg-[var(--surface)] p-4"
      >
        <input placeholder="key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
        <input placeholder="value" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
        <button type="submit" className="whitespace-nowrap rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)]">
          Add / Update
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-lg border bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-[var(--background)] text-xs uppercase text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2">Key</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-3 py-4 text-[var(--muted)]" colSpan={3}>Loading…</td></tr>
            ) : settings.length === 0 ? (
              <tr><td className="px-3 py-4 text-[var(--muted)]" colSpan={3}>No settings yet.</td></tr>
            ) : (
              settings.map((s) => (
                <tr key={s.key} className="border-b last:border-0">
                  <td className="px-3 py-2 font-mono text-xs">{s.key}</td>
                  <td className="px-3 py-2">
                    <input
                      defaultValue={s.value}
                      onBlur={(e) => e.target.value !== s.value && save(s.key, e.target.value, s.description)}
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => remove(s.key)} className="text-[var(--danger)]">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
