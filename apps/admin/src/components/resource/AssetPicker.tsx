'use client';

import { useEffect, useState } from 'react';
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
    <div className="mt-1">
      {asset && (
        <div className="mb-2 flex items-center gap-2">
          <img src={asset.url} alt="" className="h-12 w-12 rounded border object-contain bg-white" />
          <span className="truncate text-xs text-[var(--muted)]">{asset.originalFilename}</span>
          <button
            type="button"
            onClick={() => {
              setAsset(null);
              onChange(undefined);
            }}
            className="text-xs text-[var(--danger)]"
          >
            Remove
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,application/pdf"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {uploading && <p className="mt-1 text-xs text-[var(--muted)]">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
}
