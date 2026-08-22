import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateNewsEventDto, UpdateNewsEventDto } from './dto/news-event.dto';
import { NewsService } from './news.service';

@Controller('admin/news-events')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Get()
  findAll() {
    return this.service.listAllForAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id, { featuredImageAsset: true });
  }

  @Post()
  create(@Body() dto: CreateNewsEventDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNewsEventDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
