'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import { ResourceConfig } from './types';
import { ResourceForm } from './ResourceForm';

type Row = Record<string, unknown> & { id: string };

function defaultFor(type: string): unknown {
  if (type === 'boolean') return false;
  if (type === 'tags') return [];
  if (type === 'json' || type === 'asset') return undefined;
  return '';
}

function emptyValues(config: ResourceConfig): Record<string, unknown> {
  return Object.fromEntries(config.fields.map((f) => [f.key, defaultFor(f.type)]));
}

export function ResourceCrudPage({ config }: { config: ResourceConfig }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>(emptyValues(config));
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const idKey = config.idKey ?? 'id';

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<Row[]>(`${config.endpoint}${config.listQuery ?? ''}`);
      setRows(data);
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, config.listQuery]);

  useEffect(() => {
    load();
  }, [load]);

  function startCreate() {
    setEditingId(null);
    setFormValues(emptyValues(config));
    setShowForm(true);
  }

  function startEdit(row: Row) {
    setEditingId(String(row[idKey]));
    setFormValues(
      Object.fromEntries(config.fields.map((f) => [f.key, row[f.key] ?? defaultFor(f.type)])),
    );
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...formValues, ...config.fixedValues };
    for (const field of config.fields) {
      if (field.omitIfEmpty && !payload[field.key]) delete payload[field.key];
    }
    try {
      if (editingId) {
        await api.patch(`${config.endpoint}/${editingId}`, payload);
      } else {
        await api.post(config.endpoint, payload);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(row: Row) {
    if (!confirm(`Delete "${row.title ?? row.name ?? row.label ?? row[idKey]}"? This cannot be undone.`)) {
      return;
    }
    try {
      await api.delete(`${config.endpoint}/${row[idKey]}`);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete');
    }
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    const reordered = [...rows];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setRows(reordered);
    await api.patch(`${config.endpoint}/reorder`, { ids: reordered.map((r) => r[idKey]) });
  }

  const tableFields = config.fields.filter((f) => f.showInTable !== false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">{config.title}</h1>
          {config.description && <p className="text-sm text-[var(--muted)]">{config.description}</p>}
        </div>
        <button
          onClick={startCreate}
          className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)]"
        >
          Add new
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-[var(--danger)]">{error}</p>}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-lg border bg-[var(--surface)] p-4"
        >
          <ResourceForm
            fields={config.fields}
            values={formValues}
            onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
          />
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] disabled:opacity-60"
            >
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border bg-[var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-[var(--background)] text-xs uppercase text-[var(--muted)]">
            <tr>
              {config.reorderable && <th className="w-16 px-3 py-2" />}
              {tableFields.map((f) => (
                <th key={f.key} className="px-3 py-2 font-medium">
                  {f.label}
                </th>
              ))}
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-4 text-[var(--muted)]" colSpan={tableFields.length + 2}>
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-3 py-4 text-[var(--muted)]" colSpan={tableFields.length + 2}>
                  Nothing here yet.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={String(row[idKey])} className="border-b last:border-0">
                  {config.reorderable && (
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button onClick={() => move(index, -1)} disabled={index === 0} className="disabled:opacity-30">
                          ↑
                        </button>
                        <button
                          onClick={() => move(index, 1)}
                          disabled={index === rows.length - 1}
                          className="disabled:opacity-30"
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                  )}
                  {tableFields.map((f) => (
                    <td key={f.key} className="max-w-xs truncate px-3 py-2">
                      {f.type === 'boolean'
                        ? row[f.key]
                          ? 'Yes'
                          : 'No'
                        : f.type === 'asset'
                          ? row[f.key]
                            ? 'Set'
                            : '—'
                          : f.type === 'tags'
                            ? (Array.isArray(row[f.key]) ? (row[f.key] as string[]).join(', ') : '') || '—'
                            : f.type === 'json'
                              ? row[f.key]
                                ? 'Set'
                                : '—'
                              : String(row[f.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => startEdit(row)} className="mr-3 text-[var(--accent)]">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(row)} className="text-[var(--danger)]">
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
