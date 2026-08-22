import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreateTimelineEntryDto, UpdateTimelineEntryDto } from './dto/timeline-entry.dto';
import { TimelineService } from './timeline.service';

@Controller('admin/timeline-entries')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class TimelineController {
  constructor(private readonly service: TimelineService) {}

  @Get()
  findAll() {
    return this.service.listOrdered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTimelineEntryDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTimelineEntryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
