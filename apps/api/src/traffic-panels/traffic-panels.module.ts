import { Module } from '@nestjs/common';
import { TrafficPanelsController } from './traffic-panels.controller';
import { TrafficPanelsService } from './traffic-panels.service';

@Module({
  controllers: [TrafficPanelsController],
  providers: [TrafficPanelsService],
  exports: [TrafficPanelsService],
})
export class TrafficPanelsModule {}
