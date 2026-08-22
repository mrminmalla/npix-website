import { Module } from '@nestjs/common';
import { ProtocolAdoptionController } from './protocol-adoption.controller';
import { ProtocolAdoptionService } from './protocol-adoption.service';

@Module({
  controllers: [ProtocolAdoptionController],
  providers: [ProtocolAdoptionService],
  exports: [ProtocolAdoptionService],
})
export class ProtocolAdoptionModule {}
