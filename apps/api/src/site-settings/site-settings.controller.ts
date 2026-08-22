import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { UpsertSiteSettingDto } from './dto/site-setting.dto';
import { SiteSettingsService } from './site-settings.service';

@Controller('admin/site-settings')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class SiteSettingsController {
  constructor(private readonly service: SiteSettingsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.service.findOne(key);
  }

  @Put(':key')
  upsert(@Param('key') key: string, @Body() dto: UpsertSiteSettingDto) {
    return this.service.upsert(key, dto);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.service.remove(key);
  }
}
