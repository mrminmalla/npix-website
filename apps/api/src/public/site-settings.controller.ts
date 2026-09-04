import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { SiteSettingsService } from '../site-settings/site-settings.service';

@Controller('api/v1/site-settings')
@Public()
export class SiteSettingsPublicController {
  constructor(private readonly settings: SiteSettingsService) {}

  @Get()
  findAll() {
    return this.settings.findAll();
  }
}
