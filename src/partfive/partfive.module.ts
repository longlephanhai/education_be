import { Module } from '@nestjs/common';
import { PartfiveService } from './partfive.service';
import { PartfiveController } from './partfive.controller';

@Module({
  controllers: [PartfiveController],
  providers: [PartfiveService],
})
export class PartfiveModule {}
