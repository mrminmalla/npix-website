import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { DocumentCategoriesService } from '../document-categories/document-categories.service';
import { DocumentsService } from '../documents/documents.service';
import { FaqsService } from '../faqs/faqs.service';

@Controller('api/v1')
@Public()
export class DocumentsPublicController {
  constructor(
    private readonly documents: DocumentsService,
    private readonly categories: DocumentCategoriesService,
    private readonly faqs: FaqsService,
  ) {}

  @Get('documents')
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('featured') featured?: string,
    @Query('search') search?: string,
  ) {
    if (search) return this.documents.search(search);
    return this.documents.listOrdered({
      categoryId,
      featured: featured === undefined ? undefined : featured === 'true',
    });
  }

  @Get('documents/categories')
  findCategories() {
    return this.categories.listOrdered();
  }

  @Get('faqs')
  findFaqs(@Query('search') search?: string) {
    return search ? this.faqs.search(search) : this.faqs.listActive();
  }
}
