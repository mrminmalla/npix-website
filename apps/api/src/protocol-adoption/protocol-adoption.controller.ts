import { Body, Controller, Get, Patch } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { UpdateProtocolAdoptionDto } from './dto/protocol-adoption.dto';
import { ProtocolAdoptionService } from './protocol-adoption.service';

@Controller('admin/protocol-adoption')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class ProtocolAdoptionController {
  constructor(private readonly service: ProtocolAdoptionService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Patch()
  update(@Body() dto: UpdateProtocolAdoptionDto) {
    return this.service.update(dto);
  }
}
