import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminRole, MemberCategory } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreateMemberDto, UpdateMemberDto } from './dto/member.dto';
import { MembersService } from './members.service';

@Controller('admin/members')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class MembersController {
  constructor(private readonly service: MembersService) {}

  @Get()
  findAll(@Query('category') category?: MemberCategory, @Query('search') search?: string) {
    return search || category ? this.service.list({ category, search }) : this.service.listAllOrdered();
  }

  @Get('stats')
  stats() {
    return this.service.stats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id, { logoAsset: true });
  }

  @Post()
  create(@Body() dto: CreateMemberDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
