import { Injectable } from '@nestjs/common';
import { TimelineEntry } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class TimelineService extends BaseCrudService<TimelineEntry> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.timelineEntry, revalidate, ['/about']);
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' } }).then((r) => r.items);
  }
}
