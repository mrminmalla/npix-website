import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertSiteSettingDto } from './dto/site-setting.dto';

/** site_settings is a plain key/value table — not a typical id-keyed model. */
@Injectable()
export class SiteSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.siteSetting.findMany({ orderBy: { key: 'asc' } });
  }

  async findOne(key: string) {
    const setting = await this.prisma.siteSetting.findUnique({ where: { key } });
    if (!setting) throw new NotFoundException(`Setting "${key}" not found`);
    return setting;
  }

  upsert(key: string, dto: UpsertSiteSettingDto) {
    return this.prisma.siteSetting.upsert({
      where: { key },
      create: { key, ...dto },
      update: dto,
    });
  }

  async remove(key: string) {
    await this.findOne(key);
    return this.prisma.siteSetting.delete({ where: { key } });
  }

  /** Convenience for other modules/aggregates that just need the raw value. */
  async getValue(key: string, fallback = ''): Promise<string> {
    const setting = await this.prisma.siteSetting.findUnique({ where: { key } });
    return setting?.value ?? fallback;
  }
}
