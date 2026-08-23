'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ResourceField } from './types';
import { AssetPicker } from './AssetPicker';

interface Props {
  fields: ResourceField[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

function useDynamicOptions(field: ResourceField) {
  const [options, setOptions] = useState(field.options ?? []);

  useEffect(() => {
    if (!field.optionsEndpoint) return;
    api.get<Record<string, unknown>[]>(field.optionsEndpoint).then((rows) => {
      setOptions(
        rows.map((row) => ({
          value: String(row[field.optionsValueKey ?? 'id']),
          label: String(row[field.optionsLabelKey ?? 'title']),
        })),
      );
    });
    // Endpoint is static for the lifetime of a field definition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.optionsEndpoint]);

  return options;
}

function SelectField({ field, value, onChange }: { field: ResourceField; value: string; onChange: (v: string) => void }) {
  const options = useDynamicOptions(field);
  return (
    <select required={field.required} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="mt-1.5">
      <option value="" disabled>
        Select…
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function ResourceForm({ fields, values, onChange }: Props) {
  const [jsonErrors, setJsonErrors] = useState<Record<string, string | null>>({});
  const hasRequiredField = fields.some((f) => f.required);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {hasRequiredField && (
        <p className="-mb-1 text-xs font-medium text-[var(--muted)] sm:col-span-2">
          <span className="text-[var(--danger)]">*</span> Required
        </p>
      )}
      {fields.map((field) => (
        <label
          key={field.key}
          className={`block text-sm font-semibold text-[var(--foreground)] ${
            field.type === 'textarea' || field.type === 'json' ? 'sm:col-span-2' : ''
          }`}
        >
          {field.label}
          {field.required && <span className="text-[var(--danger)]"> *</span>}

          {field.type === 'textarea' ? (
            <textarea
              required={field.required}
              rows={4}
              placeholder={field.placeholder}
              value={(values[field.key] as string) ?? ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="mt-1"
            />
          ) : field.type === 'json' ? (
            <>
              <textarea
                rows={6}
                placeholder="[]"
                className="mt-1 font-mono text-xs"
                defaultValue={values[field.key] ? JSON.stringify(values[field.key], null, 2) : ''}
                aria-invalid={Boolean(jsonErrors[field.key])}
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    setJsonErrors((prev) => ({ ...prev, [field.key]: null }));
                    return onChange(field.key, undefined);
                  }
                  try {
                    onChange(field.key, JSON.parse(e.target.value));
                    setJsonErrors((prev) => ({ ...prev, [field.key]: null }));
                  } catch (err) {
                    // The typed text stays on screen either way — this
                    // used to fail with zero feedback, silently keeping
                    // the last value that *did* parse and submitting that
                    // instead of what the admin sees, with no indication
                    // anything was wrong.
                    setJsonErrors((prev) => ({
                      ...prev,
                      [field.key]: err instanceof Error ? err.message : 'Invalid JSON',
                    }));
                  }
                }}
              />
              {jsonErrors[field.key] && (
                <p role="alert" className="mt-1 text-xs font-medium text-[var(--danger)]">
                  Not valid JSON ({jsonErrors[field.key]}) — the last saved value will be used until
                  this is fixed.
                </p>
              )}
            </>
          ) : field.type === 'tags' ? (
            <input
              type="text"
              placeholder="comma, separated, tags"
              value={Array.isArray(values[field.key]) ? (values[field.key] as string[]).join(', ') : ''}
              onChange={(e) =>
                onChange(
                  field.key,
                  e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                )
              }
              className="mt-1"
            />
          ) : field.type === 'boolean' ? (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--primary)]"
                checked={Boolean(values[field.key])}
                onChange={(e) => onChange(field.key, e.target.checked)}
              />
              <span className="text-xs font-medium text-[var(--muted)]">Enabled</span>
            </div>
          ) : field.type === 'asset' ? (
            <AssetPicker
              label={field.label}
              value={values[field.key] as string | undefined}
              onChange={(id) => onChange(field.key, id)}
            />
          ) : field.type === 'select' || field.type === 'icon' ? (
            <SelectField
              field={field}
              value={values[field.key] as string}
              onChange={(v) => onChange(field.key, v)}
            />
          ) : (
            <input
              type={
                field.type === 'number'
                  ? 'number'
                  : field.type === 'date'
                    ? 'date'
                    : field.type === 'url'
                      ? 'url'
                      : 'text'
              }
              required={field.required}
              placeholder={field.placeholder}
              value={(values[field.key] as string | number) ?? ''}
              onChange={(e) =>
                onChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)
              }
              className="mt-1"
            />
          )}
        </label>
      ))}
    </div>
  );
}
