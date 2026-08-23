'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Inbox, Loader2, Search } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { useToast } from '@/lib/toast-context';
import { ResourceConfig } from './types';
import { ResourceForm } from './ResourceForm';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

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

function rowLabel(row: Row, idKey: string) {
  return String(row.title ?? row.name ?? row.label ?? row.question ?? row[idKey]);
}

export function ResourceCrudPage({ config }: { config: ResourceConfig }) {
  const toast = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
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

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      config.fields.some((f) => {
        const value = row[f.key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(q);
      }),
    );
  }, [rows, search, config.fields]);

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
        toast.push('Changes saved', 'success');
      } else {
        await api.post(config.endpoint, payload);
        toast.push('Created successfully', 'success');
      }
      setShowForm(false);
      await load();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to save';
      setError(message);
      toast.push(message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(row: Row) {
    const blockReason = config.isRowDeleteBlocked?.(row, rows);
    if (blockReason) {
      toast.push(blockReason, 'error');
      return;
    }
    if (!confirm(`Delete "${rowLabel(row, idKey)}"? This cannot be undone.`)) return;
    try {
      await api.delete(`${config.endpoint}/${row[idKey]}`);
      toast.push('Deleted', 'success');
      await load();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to delete';
      setError(message);
      toast.push(message, 'error');
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
  const canReorder = config.reorderable && !search.trim();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[var(--foreground)]">{config.title}</h1>
          {config.description && <p className="mt-0.5 text-sm text-[var(--muted)]">{config.description}</p>}
        </div>
        <Button onClick={startCreate}>
          <Plus className="h-4 w-4" />
          Add new
        </Button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-[var(--danger-tint)] px-3 py-2 text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      {rows.length > 0 && (
        <div className="relative mt-4 w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter…"
            className="pl-9"
          />
        </div>
      )}

      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--primary-tint)] text-[11px] font-bold uppercase tracking-wider text-[var(--primary)]">
              <tr>
                {canReorder && <th className="w-16 px-4 py-3" />}
                {tableFields.map((f) => (
                  <th key={f.key} className="px-4 py-3">
                    {f.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-sm text-[var(--muted)]"
                    colSpan={tableFields.length + 2}
                  >
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin text-[var(--primary)]" />
                    Loading…
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-sm text-[var(--muted)]"
                    colSpan={tableFields.length + 2}
                  >
                    <Inbox className="mx-auto mb-2 h-6 w-6 text-slate-300 dark:text-slate-700" />
                    {rows.length === 0 ? 'Nothing here yet.' : 'No matches for your filter.'}
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, index) => (
                  <tr
                    key={String(row[idKey])}
                    className="transition hover:bg-[var(--primary-tint)]/40"
                  >
                    {canReorder && (
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => move(index, -1)}
                            disabled={index === 0}
                            className="rounded text-[var(--muted)] hover:text-[var(--primary)] disabled:opacity-25"
                          >
                            <ChevronUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => move(index, 1)}
                            disabled={index === rows.length - 1}
                            className="rounded text-[var(--muted)] hover:text-[var(--primary)] disabled:opacity-25"
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                    {tableFields.map((f) => (
                      <td key={f.key} className="max-w-xs truncate px-4 py-3 font-medium text-[var(--foreground)]">
                        {f.type === 'boolean' ? (
                          <Badge tone={row[f.key] ? 'success' : 'neutral'}>
                            {row[f.key] ? 'Yes' : 'No'}
                          </Badge>
                        ) : f.type === 'select' ? (
                          row[f.key] ? (
                            <Badge tone="info">{String(row[f.key])}</Badge>
                          ) : (
                            <span className="text-[var(--muted)]">—</span>
                          )
                        ) : f.type === 'asset' ? (
                          <Badge tone={row[f.key] ? 'info' : 'neutral'}>{row[f.key] ? 'Set' : '—'}</Badge>
                        ) : f.type === 'tags' ? (
                          (Array.isArray(row[f.key]) ? (row[f.key] as string[]).join(', ') : '') || (
                            <span className="text-[var(--muted)]">—</span>
                          )
                        ) : f.type === 'json' ? (
                          <Badge tone={row[f.key] ? 'info' : 'neutral'}>{row[f.key] ? 'Set' : '—'}</Badge>
                        ) : (
                          String(row[f.key] ?? '—')
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => startEdit(row)}
                          title="Edit"
                          className="rounded-lg bg-[var(--primary-tint)] p-1.5 text-[var(--primary)] transition hover:opacity-80"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        {(() => {
                          const blockReason = config.isRowDeleteBlocked?.(row, rows);
                          return (
                            <button
                              onClick={() => handleDelete(row)}
                              disabled={Boolean(blockReason)}
                              title={blockReason || 'Delete'}
                              className="rounded-lg bg-[var(--danger-tint)] p-1.5 text-[var(--danger)] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          );
                        })()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingId ? `Edit ${config.title}` : `Add ${config.title}`}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <ResourceForm
            fields={config.fields}
            values={formValues}
            onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
          />
          <div className="mt-6 flex justify-end gap-2 border-t border-[var(--border)] pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
