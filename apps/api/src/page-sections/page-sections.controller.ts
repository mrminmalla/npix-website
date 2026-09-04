import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreatePageSectionDto, UpdatePageSectionDto } from './dto/page-section.dto';
import { PageSectionsService } from './page-sections.service';

@Controller('admin/page-sections')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class PageSectionsController {
  constructor(private readonly service: PageSectionsService) {}

  @Get()
  findAll(@Query('pageSlug') pageSlug?: string) {
    return pageSlug ? this.service.listByPage(pageSlug) : this.service.listOrdered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePageSectionDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePageSectionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
