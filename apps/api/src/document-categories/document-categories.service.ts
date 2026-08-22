import { Injectable } from '@nestjs/common';
import { DocumentCategory } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class DocumentCategoriesService extends BaseCrudService<DocumentCategory> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.documentCategory, revalidate, ['/documentation']);
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' } }).then((r) => r.items);
  }
}
