import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import sharp from 'sharp';
import { PrismaService } from '../prisma/prisma.service';
import { STORAGE_DRIVER, StorageDriver } from './storage-driver';

const IMAGE_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']);

@Injectable()
export class AssetsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(STORAGE_DRIVER) private readonly storage: StorageDriver,
  ) {}

  async upload(file: Express.Multer.File, altText: string | undefined, uploadedById: string) {
    const key = `${randomUUID()}${extname(file.originalname)}`;
    const { url } = await this.storage.upload(file.buffer, key, file.mimetype);

    let width: number | undefined;
    let height: number | undefined;
    if (IMAGE_MIME_TYPES.has(file.mimetype) && file.mimetype !== 'image/svg+xml') {
      try {
        const metadata = await sharp(file.buffer).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch {
        // Non-fatal — some inputs (rare formats) may not be readable by sharp.
      }
    }

    return this.prisma.asset.create({
      data: {
        storageKey: key,
        url,
        originalFilename: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        width,
        height,
        altText,
        uploadedById,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.asset.findUniqueOrThrow({ where: { id } });
  }

  findAll(page = 1, pageSize = 40) {
    return this.prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async remove(id: string) {
    const asset = await this.prisma.asset.findUniqueOrThrow({ where: { id } });
    await this.storage.delete(asset.storageKey);
    return this.prisma.asset.delete({ where: { id } });
  }
}
