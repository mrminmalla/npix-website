import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';
import { DocumentsService } from './documents.service';

@Controller('admin/documents')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Get()
  findAll(@Query('categoryId') categoryId?: string, @Query('search') search?: string) {
    if (search) return this.service.search(search);
    return this.service.listOrdered({ categoryId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOneWithRelations(id);
  }

  @Post()
  create(@Body() dto: CreateDocumentDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
