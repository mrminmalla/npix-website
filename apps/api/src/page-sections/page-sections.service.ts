import { Injectable } from '@nestjs/common';
import { PageSection } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class PageSectionsService extends BaseCrudService<PageSection> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.pageSection, revalidate, ['/about']);
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' } }).then((r) => r.items);
  }

  listByPage(pageSlug: string) {
    return this.findAll({ where: { pageSlug }, orderBy: { sortOrder: 'asc' } }).then(
      (r) => r.items,
    );
  }
}
