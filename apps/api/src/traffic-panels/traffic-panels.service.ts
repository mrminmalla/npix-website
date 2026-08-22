import { Injectable } from '@nestjs/common';
import { TrafficPanel } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class TrafficPanelsService extends BaseCrudService<TrafficPanel> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    // The first active panel also feeds the Home page's traffic embed.
    super(prisma.trafficPanel, revalidate, ['/', '/statistics']);
  }

  listActive() {
    return this.findAll({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }).then(
      (r) => r.items,
    );
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' } }).then((r) => r.items);
  }
}
