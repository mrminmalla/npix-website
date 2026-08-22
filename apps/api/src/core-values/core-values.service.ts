import { Injectable } from '@nestjs/common';
import { CoreValue } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class CoreValuesService extends BaseCrudService<CoreValue> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.coreValue, revalidate, ['/about']);
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' } }).then((r) => r.items);
  }
}
