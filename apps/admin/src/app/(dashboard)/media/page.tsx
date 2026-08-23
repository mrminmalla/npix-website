'use client';

import { useEffect, useState } from 'react';
import { Trash2, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { useToast } from '@/lib/toast-context';
import { Card } from '@/components/ui/Card';

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
  const toast = useToast();
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
      toast.push('File uploaded', 'success');
      await load();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Upload failed';
      setError(message);
      toast.push(message, 'error');
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this asset? Anything referencing it will show as missing.')) return;
    await api.delete(`/admin/assets/${id}`);
    toast.push('Asset deleted', 'success');
    await load();
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-[var(--foreground)]">Media Library</h1>
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            Every image and file uploaded from any content form lives here.
          </p>
        </div>
        <label className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--primary-hover)]">
          <UploadCloud className="h-4 w-4" />
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

      {error && (
        <p className="mt-4 rounded-lg bg-[var(--danger-tint)] px-3 py-2 text-sm font-medium text-[var(--danger)]">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {loading ? (
          <p className="col-span-full text-sm text-[var(--muted)]">Loading…</p>
        ) : assets.length === 0 ? (
          <p className="col-span-full text-sm text-[var(--muted)]">No files uploaded yet.</p>
        ) : (
          assets.map((asset) => (
            <Card key={asset.id} className="group relative overflow-hidden p-2">
              {asset.mimeType.startsWith('image/') ? (
                <img
                  src={asset.url}
                  alt={asset.altText ?? ''}
                  className="h-24 w-full rounded-lg border border-[var(--border)] bg-white object-contain"
                />
              ) : (
                <div className="flex h-24 items-center justify-center rounded-lg bg-[var(--surface-hover)] text-[var(--muted)]">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}
              <p className="mt-2 truncate text-xs font-semibold text-[var(--foreground)]">
                {asset.originalFilename}
              </p>
              <p className="text-[10px] font-medium text-[var(--muted)]">
                {Math.round(asset.sizeBytes / 1024)} KB
              </p>
              <button
                onClick={() => remove(asset.id)}
                title="Delete"
                className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-[var(--danger)] opacity-0 shadow-sm transition group-hover:opacity-100 dark:bg-slate-900/90"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
