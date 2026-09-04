import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreateTrafficPanelDto, UpdateTrafficPanelDto } from './dto/traffic-panel.dto';
import { TrafficPanelsService } from './traffic-panels.service';

@Controller('admin/traffic-panels')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class TrafficPanelsController {
  constructor(private readonly service: TrafficPanelsService) {}

  @Get()
  findAll() {
    return this.service.listOrdered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTrafficPanelDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrafficPanelDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
