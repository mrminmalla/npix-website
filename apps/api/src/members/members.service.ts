import { Injectable } from '@nestjs/common';
import { Member, MemberCategory } from '@prisma/client';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';

@Injectable()
export class MembersService extends BaseCrudService<Member> {
  constructor(
    private readonly prisma: PrismaService,
    revalidate: RevalidateService,
  ) {
    // The Members page shows the full directory; Home shows a curated
    // showcase of special members with logos.
    super(prisma.member, revalidate, ['/members', '/']);
  }

  /** Mirrors the current site's client-side directory: name/ASN search, alpha sort. */
  async list(filters: { category?: MemberCategory; search?: string } = {}) {
    const where = {
      isActive: true,
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: 'insensitive' as const } },
              { asn: { contains: filters.search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };
    return this.prisma.member.findMany({ where, orderBy: { name: 'asc' }, include: { logoAsset: true } });
  }

  listAllOrdered() {
    return this.findAll({ orderBy: { name: 'asc' }, include: { logoAsset: true } }).then(
      (r) => r.items,
    );
  }

  /**
   * Computed live, never stored: mirrors HOME_STATS/MEMBERS-page stat cards
   * on the current static site, which derive these from the members array.
   */
  async stats() {
    const [total, ipv6Enabled, datahubEnabled, asns] = await Promise.all([
      this.prisma.member.count({ where: { isActive: true } }),
      this.prisma.member.count({ where: { isActive: true, ipv6Address: { not: null } } }),
      this.prisma.member.count({
        where: { isActive: true, AND: [{ datahubIp: { not: null } }, { datahubIp: { not: '' } }] },
      }),
      this.prisma.member.findMany({ where: { isActive: true }, select: { asn: true } }),
    ]);
    const uniqueAsns = new Set(asns.map((m) => m.asn)).size;
    return {
      totalMembers: total,
      uniqueAsns,
      datahubEnabled,
      ipv4Sessions: total,
      ipv6Sessions: ipv6Enabled,
    };
  }

  showcase() {
    return this.prisma.member.findMany({
      where: { isActive: true, category: MemberCategory.special, logoAssetId: { not: null } },
      include: { logoAsset: true },
      orderBy: { name: 'asc' },
    });
  }
}
