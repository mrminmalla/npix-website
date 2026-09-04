import { Module } from '@nestjs/common';
import { CoreValuesController } from './core-values.controller';
import { CoreValuesService } from './core-values.service';

@Module({
  controllers: [CoreValuesController],
  providers: [CoreValuesService],
  exports: [CoreValuesService],
})
export class CoreValuesModule {}
