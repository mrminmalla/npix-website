import { NotFoundException } from '@nestjs/common';
import { RevalidateService } from '../revalidate/revalidate.service';

/**
 * Structural shape shared by every Prisma model delegate (prisma.member,
 * prisma.newsEvent, ...). Using this instead of Prisma's generated types
 * directly keeps the base class reusable across models with different
 * field shapes.
 */
export interface CrudDelegate<T> {
  findMany(args?: Record<string, unknown>): Promise<T[]>;
  count(args?: Record<string, unknown>): Promise<number>;
  findUnique(args: Record<string, unknown>): Promise<T | null>;
  create(args: Record<string, unknown>): Promise<T>;
  update(args: Record<string, unknown>): Promise<T>;
  delete(args: Record<string, unknown>): Promise<T>;
}

export interface FindAllOptions {
  where?: Record<string, unknown>;
  orderBy?: Record<string, unknown> | Record<string, unknown>[];
  skip?: number;
  take?: number;
  include?: Record<string, unknown>;
}

const BARE_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * DTOs validate date fields with `@IsDateString()`, which accepts bare
 * "YYYY-MM-DD" strings (exactly what an HTML `<input type="date">` sends).
 * Prisma 6's DateTime columns don't coerce those themselves — passing one
 * straight through throws `PrismaClientValidationError: premature end of
 * input, Expected ISO-8601 DateTime`. Converting bare-date strings to real
 * Date objects here means every resource gets this for free instead of
 * each service having to remember to do it (see NewsService, which does
 * this manually because it overrides create/update for other reasons).
 */
function normalizeDates(data: object): object {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) =>
      typeof value === 'string' && BARE_DATE.test(value) ? [key, new Date(value)] : [key, value],
    ),
  );
}

/**
 * Shared CRUD + reorder implementation for the many small lookup/content
 * tables in this schema (core values, timeline entries, stat cards, ...).
 * Resource-specific modules extend this with their own Prisma delegate and
 * add whatever bespoke query logic they need on top.
 *
 * `revalidatePaths` are the public frontend routes this resource's content
 * appears on — every mutation pings the frontend to drop its ISR cache for
 * exactly those paths, so admin edits show up immediately. Pass an empty
 * array (or omit `revalidate`) for resources with no directly-rendered
 * public page (e.g. admin users).
 */
export class BaseCrudService<T extends { id: string }> {
  constructor(
    protected readonly delegate: CrudDelegate<T>,
    private readonly revalidate?: RevalidateService,
    private readonly revalidatePaths: string[] = [],
  ) {}

  private triggerRevalidate(): void {
    void this.revalidate?.trigger(this.revalidatePaths);
  }

  async findAll(options: FindAllOptions = {}): Promise<{ items: T[]; total: number }> {
    const { where, orderBy, skip, take, include } = options;
    const [items, total] = await Promise.all([
      this.delegate.findMany({ where, orderBy, skip, take, include }),
      this.delegate.count({ where }),
    ]);
    return { items, total };
  }

  async findOne(id: string, include?: Record<string, unknown>): Promise<T> {
    const item = await this.delegate.findUnique({ where: { id }, include });
    if (!item) {
      throw new NotFoundException(`Resource with id "${id}" not found`);
    }
    return item;
  }

  // `object` (not `Record<string, unknown>`) so DTO class instances — which
  // don't have an index signature — can be passed straight through from
  // controllers without an intermediate spread/cast.
  async create(data: object): Promise<T> {
    const result = await this.delegate.create({ data: normalizeDates(data) });
    this.triggerRevalidate();
    return result;
  }

  async update(id: string, data: object): Promise<T> {
    await this.findOne(id);
    const result = await this.delegate.update({ where: { id }, data: normalizeDates(data) });
    this.triggerRevalidate();
    return result;
  }

  async remove(id: string): Promise<T> {
    await this.findOne(id);
    const result = await this.delegate.delete({ where: { id } });
    this.triggerRevalidate();
    return result;
  }

  /** Persists a new sort order given an ordered array of ids. */
  async reorder(ids: string[]): Promise<void> {
    await Promise.all(
      ids.map((id, index) =>
        this.delegate.update({ where: { id }, data: { sortOrder: index } }),
      ),
    );
    this.triggerRevalidate();
  }
}
