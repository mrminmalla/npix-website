import { Module } from '@nestjs/common';
import { PointsOfPresenceController } from './points-of-presence.controller';
import { PointsOfPresenceService } from './points-of-presence.service';

@Module({
  controllers: [PointsOfPresenceController],
  providers: [PointsOfPresenceService],
  exports: [PointsOfPresenceService],
})
export class PointsOfPresenceModule {}
