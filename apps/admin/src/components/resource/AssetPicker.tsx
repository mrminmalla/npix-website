'use client';

import { useEffect, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { api, ApiError } from '@/lib/api';

interface Asset {
  id: string;
  url: string;
  originalFilename: string;
}

export function AssetPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (assetId: string | undefined) => void;
}) {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setAsset(null);
      return;
    }
    api
      .get<Asset>(`/admin/assets/${value}`)
      .then(setAsset)
      .catch(() => setAsset(null));
  }, [value]);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const uploaded = await api.upload<Asset>('/admin/assets', file, { altText: label });
      setAsset(uploaded);
      onChange(uploaded.id);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-1.5">
      {asset ? (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] p-2.5">
          <img
            src={asset.url}
            alt=""
            className="h-12 w-12 shrink-0 rounded-lg border border-[var(--border)] bg-white object-contain"
          />
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-[var(--foreground)]">
            {asset.originalFilename}
          </span>
          <button
            type="button"
            onClick={() => {
              setAsset(null);
              onChange(undefined);
            }}
            title="Remove"
            aria-label={`Remove ${asset.originalFilename}`}
            className="shrink-0 rounded-lg p-1.5 text-[var(--danger)] transition hover:bg-[var(--danger-tint)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-hover)] px-4 py-3 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]">
          <UploadCloud className="h-4 w-4" />
          {uploading ? 'Uploading…' : 'Upload file'}
          <input
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}
      {error && <p className="mt-1 text-xs font-medium text-[var(--danger)]">{error}</p>}
    </div>
  );
}
