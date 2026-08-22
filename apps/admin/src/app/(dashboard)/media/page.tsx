'use client';

import { useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';

interface Asset {
  id: string;
  url: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
  altText?: string;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setAssets(await api.get<Asset[]>('/admin/assets'));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      await api.upload('/admin/assets', file);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this asset? Anything referencing it will show as missing.')) return;
    await api.delete(`/admin/assets/${id}`);
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Media Library</h1>
          <p className="text-sm text-[var(--muted)]">
            Every image and file uploaded from any content form lives here.
          </p>
        </div>
        <label className="cursor-pointer rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)]">
          {uploading ? 'Uploading…' : 'Upload file'}
          <input
            type="file"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-[var(--danger)]">{error}</p>}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Loading…</p>
        ) : assets.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No files uploaded yet.</p>
        ) : (
          assets.map((asset) => (
            <div key={asset.id} className="rounded-lg border bg-[var(--surface)] p-2">
              {asset.mimeType.startsWith('image/') ? (
                <img src={asset.url} alt={asset.altText ?? ''} className="h-24 w-full rounded object-contain bg-white" />
              ) : (
                <div className="flex h-24 items-center justify-center rounded bg-[var(--background)] text-xs text-[var(--muted)]">
                  {asset.mimeType}
                </div>
              )}
              <p className="mt-2 truncate text-xs">{asset.originalFilename}</p>
              <p className="text-[10px] text-[var(--muted)]">{Math.round(asset.sizeBytes / 1024)} KB</p>
              <button onClick={() => remove(asset.id)} className="mt-1 text-xs text-[var(--danger)]">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
