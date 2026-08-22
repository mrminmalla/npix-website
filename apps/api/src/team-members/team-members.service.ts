import { Injectable } from '@nestjs/common';
import { TeamMember } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

const INCLUDE = { photoAsset: true };

@Injectable()
export class TeamMembersService extends BaseCrudService<TeamMember> {
  constructor(prisma: PrismaService, revalidate: RevalidateService) {
    super(prisma.teamMember, revalidate, ['/about']);
  }

  listActive() {
    return this.findAll({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: INCLUDE,
    }).then((r) => r.items);
  }

  listOrdered() {
    return this.findAll({ orderBy: { sortOrder: 'asc' }, include: INCLUDE }).then((r) => r.items);
  }

  findOneWithPhoto(id: string) {
    return this.findOne(id, INCLUDE);
  }
}
