import { Injectable } from '@nestjs/common';
import { WhyNpixItem } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class WhyNpixService extends BaseCrudService<WhyNpixItem> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.whyNpixItem, revalidate, ['/']);
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' } }).then((r) => r.items);
  }
}
