import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminRole, StatSection } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreateStatCardDto, UpdateStatCardDto } from './dto/stat-card.dto';
import { StatCardsService } from './stat-cards.service';

@Controller('admin/stat-cards')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class StatCardsController {
  constructor(private readonly service: StatCardsService) {}

  @Get()
  findAll(@Query('section') section?: StatSection) {
    return section ? this.service.listBySection(section) : this.service.listOrdered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateStatCardDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStatCardDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
