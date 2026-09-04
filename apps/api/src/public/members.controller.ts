import { Controller, Get, Query } from '@nestjs/common';
import { MemberCategory } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';
import { MembersService } from '../members/members.service';

@Controller('api/v1/members')
@Public()
export class MembersPublicController {
  constructor(private readonly members: MembersService) {}

  @Get()
  findAll(@Query('category') category?: MemberCategory, @Query('search') search?: string) {
    return this.members.list({ category, search });
  }

  @Get('stats')
  stats() {
    return this.members.stats();
  }
}
