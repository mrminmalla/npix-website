import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreateWhyNpixItemDto, UpdateWhyNpixItemDto } from './dto/why-npix-item.dto';
import { WhyNpixService } from './why-npix.service';

@Controller('admin/why-npix-items')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class WhyNpixController {
  constructor(private readonly service: WhyNpixService) {}

  @Get()
  findAll() {
    return this.service.listOrdered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateWhyNpixItemDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWhyNpixItemDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
