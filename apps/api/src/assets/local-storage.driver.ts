import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { StorageDriver, UploadResult } from './storage-driver';

/**
 * Writes files to a local directory (bind-mounted / volume-backed in the
 * dev Docker setup). Served statically by Nest from `/uploads`. Swapped
 * for `S3StorageDriver` in production via STORAGE_DRIVER=s3.
 */
@Injectable()
export class LocalStorageDriver implements StorageDriver {
  private readonly root: string;
  private readonly publicBaseUrl: string;

  constructor(config: ConfigService) {
    this.root = config.get<string>('UPLOADS_DIR', './uploads');
    this.publicBaseUrl = config.get<string>(
      'PUBLIC_ASSET_BASE_URL',
      'http://localhost:4100/uploads',
    );
  }

  async upload(buffer: Buffer, key: string, _mimeType: string): Promise<UploadResult> {
    const filePath = join(this.root, key);
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, buffer);
    return { key, url: `${this.publicBaseUrl}/${key}` };
  }

  async delete(key: string): Promise<void> {
    try {
      await unlink(join(this.root, key));
    } catch {
      // Already gone — deleting is idempotent from the caller's perspective.
    }
  }
}
