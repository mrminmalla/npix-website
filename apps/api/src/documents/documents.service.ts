import { Injectable } from '@nestjs/common';
import { Document } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

const INCLUDE = { category: true, fileAsset: true, previewAsset: true };

@Injectable()
export class DocumentsService extends BaseCrudService<Document> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.document, revalidate, ['/documentation']);
  }

  listOrdered(filters: { categoryId?: string; featured?: boolean } = {}) {
    return this.findAll({
      where: {
        ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
        ...(filters.featured !== undefined ? { isFeatured: filters.featured } : {}),
      },
      orderBy: { sortOrder: 'asc' },
      include: INCLUDE,
    }).then((r) => r.items);
  }

  findOneWithRelations(id: string) {
    return this.findOne(id, INCLUDE);
  }

  async search(query: string) {
    const all = await this.listOrdered();
    const q = query.toLowerCase();
    return all.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }
}
