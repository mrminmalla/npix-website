import { Injectable } from '@nestjs/common';
import { PointOfPresence } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class PointsOfPresenceService extends BaseCrudService<PointOfPresence> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.pointOfPresence, revalidate, ['/statistics']);
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
