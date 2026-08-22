export interface UploadResult {
  key: string;
  url: string;
}

export interface StorageDriver {
  upload(buffer: Buffer, key: string, mimeType: string): Promise<UploadResult>;
  delete(key: string): Promise<void>;
}

export const STORAGE_DRIVER = Symbol('STORAGE_DRIVER');
