import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminRole } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthenticatedUser } from '../auth/types';
import { AssetsService } from './assets.service';

@Controller('admin/assets')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class AssetsController {
  constructor(private readonly assets: AssetsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('altText') altText: string | undefined,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.assets.upload(file, altText, user.id);
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('pageSize') pageSize?: string) {
    return this.assets.findAll(page ? Number(page) : undefined, pageSize ? Number(pageSize) : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assets.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assets.remove(id);
  }
}
