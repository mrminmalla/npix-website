import { Injectable } from '@nestjs/common';
import { StatCard, StatSection } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class StatCardsService extends BaseCrudService<StatCard> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    // Cards can live on Home (section=home) or Statistics
    // (traffic_insights/infrastructure) — revalidating both is simpler and
    // cheaper than tracking which section changed on every mutation.
    super(prisma.statCard, revalidate, ['/', '/statistics']);
  }

  listOrdered() {
    return this.findAll({ orderBy: [{ section: 'asc' }, { sortOrder: 'asc' }] }).then(
      (r) => r.items,
    );
  }

  listBySection(section: StatSection) {
    return this.findAll({ where: { section }, orderBy: { sortOrder: 'asc' } }).then(
      (r) => r.items,
    );
  }
}
