import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { ReorderDto } from '../common/dto/reorder.dto';
import {
  CreateDocumentCategoryDto,
  UpdateDocumentCategoryDto,
} from './dto/document-category.dto';
import { DocumentCategoriesService } from './document-categories.service';

@Controller('admin/document-categories')
@Roles(AdminRole.SUPER_ADMIN, AdminRole.EDITOR)
export class DocumentCategoriesController {
  constructor(private readonly service: DocumentCategoriesService) {}

  @Get()
  findAll() {
    return this.service.listOrdered();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDocumentCategoryDto) {
    return this.service.create(dto);
  }

  @Patch('reorder')
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDocumentCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
