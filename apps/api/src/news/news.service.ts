import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ContentStatus, NewsCategory, NewsEvent } from '@prisma/client';
import slugify from 'slugify';
import { BaseCrudService } from '../common/base-crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { RevalidateService } from '../revalidate/revalidate.service';
import { CreateNewsEventDto, UpdateNewsEventDto } from './dto/news-event.dto';

const INCLUDE = { featuredImageAsset: true };
const EVENT_CATEGORIES: NewsCategory[] = [NewsCategory.Workshops, NewsCategory.Conferences];

// create()/update() store `publishedAt` as UTC-midnight of the admin's
// entered calendar date (`new Date("2026-09-17")` -> 2026-09-17T00:00Z).
// NPIX operates on Nepal time (UTC+5:45, no DST), where that instant is
// already 5:45am local — so comparing it straight against `now` made an
// event dated "today" fall out of upcomingEvents() the moment any time
// had passed since UTC midnight, i.e. for nearly all of the Nepal
// business day. "Upcoming" should mean "hasn't finished its whole
// calendar day in Nepal time yet", so the cutoff below is pushed back by
// (24h - the NPT offset), keeping an event eligible through end-of-day
// NPT instead of just past its stored UTC timestamp.
const NPT_OFFSET_MS = (5 * 60 + 45) * 60 * 1000;
const END_OF_DAY_NPT_GRACE_MS = 24 * 60 * 60 * 1000 - NPT_OFFSET_MS;

@Injectable()
export class NewsService extends BaseCrudService<NewsEvent> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly revalidateService: RevalidateService,
  ) {
    // create/update are overridden below (custom slug logic) and trigger
    // revalidation manually, including the article's own detail page.
    super(prisma.newsEvent, revalidateService, ['/news', '/']);
  }

  private async uniqueSlug(base: string, excludeId?: string): Promise<string> {
    const root = slugify(base, { lower: true, strict: true });
    let candidate = root;
    let suffix = 1;
    // Small keyspace (news items are hand-authored, not high-volume) — a
    // simple retry loop is clearer here than a single clever query.
    while (
      await this.prisma.newsEvent.findFirst({
        where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
      })
    ) {
      suffix += 1;
      candidate = `${root}-${suffix}`;
    }
    return candidate;
  }

  async create(dto: CreateNewsEventDto) {
    const slug = dto.slug ? slugify(dto.slug, { lower: true, strict: true }) : await this.uniqueSlug(dto.title);
    const result = await this.prisma.$transaction(async (tx) => {
      // Only one item is ever displayed as "featured" on the public site
      // (news.service.ts's own `featured()` query), so keep the DB's
      // isFeatured flags consistent with that: marking a new item featured
      // un-features whatever previously held it, rather than leaving
      // multiple rows flagged true and letting an arbitrary one win.
      if (dto.isFeatured) {
        await tx.newsEvent.updateMany({ where: { isFeatured: true }, data: { isFeatured: false } });
      }
      return tx.newsEvent.create({ data: { ...dto, slug, publishedAt: new Date(dto.publishedAt) } });
    });
    void this.revalidateService.trigger(['/news', '/', `/news/${result.slug}`]);
    return result;
  }

  async update(id: string, dto: UpdateNewsEventDto) {
    await this.findOne(id);
    const data: Record<string, unknown> = { ...dto };
    if (dto.slug) data.slug = await this.uniqueSlug(dto.slug, id);
    if (dto.publishedAt) data.publishedAt = new Date(dto.publishedAt);
    const result = await this.prisma.$transaction(async (tx) => {
      // Same one-featured-item invariant as create() above.
      if (dto.isFeatured) {
        await tx.newsEvent.updateMany({ where: { isFeatured: true, id: { not: id } }, data: { isFeatured: false } });
      }
      return tx.newsEvent.update({ where: { id }, data });
    });
    void this.revalidateService.trigger(['/news', '/', `/news/${result.slug}`]);
    return result;
  }

  async list(filters: {
    category?: NewsCategory;
    year?: string;
    search?: string;
    page?: number;
    pageSize?: number;
    status?: ContentStatus;
  }) {
    const { category, year, search, page = 1, pageSize = 6, status } = filters;
    const where = {
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { summary: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };
    const [allMatching, items] = await Promise.all([
      this.prisma.newsEvent.findMany({ where, select: { publishedAt: true } }),
      this.prisma.newsEvent.findMany({
        where: year
          ? { ...where, publishedAt: { gte: new Date(`${year}-01-01`), lt: new Date(`${Number(year) + 1}-01-01`) } }
          : where,
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: INCLUDE,
      }),
    ]);
    const years = Array.from(new Set(allMatching.map((n) => n.publishedAt.getFullYear()))).sort(
      (a, b) => b - a,
    );
    const total = year
      ? allMatching.filter((n) => n.publishedAt.getFullYear() === Number(year)).length
      : allMatching.length;
    return { items, total, page, pageSize, years };
  }

  /** Plain array for the admin list table (drafts included, no pagination
   *  wrapper) — the public `list()` above returns a paginated shape meant
   *  for the site's News & Events page, which the admin UI doesn't use. */
  listAllForAdmin() {
    return this.prisma.newsEvent.findMany({
      orderBy: { publishedAt: 'desc' },
      include: INCLUDE,
    });
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.newsEvent.findUnique({ where: { slug }, include: INCLUDE });
    if (!item) throw new NotFoundException(`News item "${slug}" not found`);
    return item;
  }

  /** Purely admin-controlled: whichever single item create()/update() last
   *  marked isFeatured, or null if the admin has featured nothing (or only
   *  featured a draft — a featured item still has to be published to show
   *  up here, same as everywhere else on the public site). Deliberately no
   *  "fall back to the latest article" behavior — publish/created date must
   *  never silently stand in for an explicit admin choice. */
  featured() {
    return this.prisma.newsEvent.findFirst({
      where: { isFeatured: true, status: ContentStatus.published },
      // create()/update() enforce at most one row featured at a time, so
      // this orderBy is only a defensive tiebreaker (instead of Postgres's
      // unspecified findFirst order) in case data is ever edited directly.
      orderBy: { publishedAt: 'desc' },
      include: INCLUDE,
    });
  }

  upcomingEvents(limit = 3) {
    return this.prisma.newsEvent.findMany({
      where: {
        status: ContentStatus.published,
        category: { in: EVENT_CATEGORIES },
        publishedAt: { gte: new Date(Date.now() - END_OF_DAY_NPT_GRACE_MS) },
      },
      orderBy: { publishedAt: 'asc' },
      take: limit,
      include: INCLUDE,
    });
  }

  latestByCategories(categories: NewsCategory[], limit = 4) {
    return this.prisma.newsEvent.findMany({
      where: { status: ContentStatus.published, category: { in: categories } },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      include: INCLUDE,
    });
  }

  async ensureSlugAvailable(slug: string) {
    const existing = await this.prisma.newsEvent.findUnique({ where: { slug } });
    if (existing) throw new ConflictException(`Slug "${slug}" is already in use`);
  }
}
