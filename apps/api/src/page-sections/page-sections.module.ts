import { Module } from '@nestjs/common';
import { PageSectionsController } from './page-sections.controller';
import { PageSectionsService } from './page-sections.service';

@Module({
  controllers: [PageSectionsController],
  providers: [PageSectionsService],
  exports: [PageSectionsService],
})
export class PageSectionsModule {}
