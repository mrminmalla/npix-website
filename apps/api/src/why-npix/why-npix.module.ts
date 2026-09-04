import { Module } from '@nestjs/common';
import { WhyNpixController } from './why-npix.controller';
import { WhyNpixService } from './why-npix.service';

@Module({
  controllers: [WhyNpixController],
  providers: [WhyNpixService],
  exports: [WhyNpixService],
})
export class WhyNpixModule {}
