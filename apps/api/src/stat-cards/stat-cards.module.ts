import { Module } from '@nestjs/common';
import { StatCardsController } from './stat-cards.controller';
import { StatCardsService } from './stat-cards.service';

@Module({
  controllers: [StatCardsController],
  providers: [StatCardsService],
  exports: [StatCardsService],
})
export class StatCardsModule {}
