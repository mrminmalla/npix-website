import { Injectable } from '@nestjs/common';
import { Faq } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class FaqsService extends BaseCrudService<Faq> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.faq, revalidate, ['/documentation']);
  }

  listActive() {
    return this.findAll({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }).then(
      (r) => r.items,
    );
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' } }).then((r) => r.items);
  }

  search(query: string) {
    const q = query.toLowerCase();
    return this.listActive().then((items) =>
      items.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
      ),
    );
  }
}
