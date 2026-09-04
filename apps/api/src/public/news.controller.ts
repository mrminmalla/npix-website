import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContentStatus, NewsCategory } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';
import { NewsService } from '../news/news.service';

@Controller('api/v1/news')
@Public()
export class NewsPublicController {
  constructor(private readonly news: NewsService) {}

  @Get()
  findAll(
    @Query('category') category?: NewsCategory,
    @Query('year') year?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.news.list({
      category,
      year,
      search,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      status: ContentStatus.published,
    });
  }

  @Get('upcoming-events')
  upcoming() {
    return this.news.upcomingEvents();
  }

  @Get('featured')
  featured() {
    return this.news.featured();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.news.findBySlug(slug);
  }
}
