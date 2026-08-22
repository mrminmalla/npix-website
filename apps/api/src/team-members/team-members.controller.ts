import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto/team-member.dto';
import { TeamMembersService } from './team-members.service';

@Controller('admin/team-members')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class TeamMembersController {
  constructor(private readonly service: TeamMembersService) {}

  @Get()
  findAll() {
    return this.service.listOrdered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOneWithPhoto(id);
  }

  @Post()
  create(@Body() dto: CreateTeamMemberDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
