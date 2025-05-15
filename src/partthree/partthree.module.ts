import { Module } from '@nestjs/common';
import { PartthreeService } from './partthree.service';
import { PartthreeController } from './partthree.controller';

@Module({
  controllers: [PartthreeController],
  providers: [PartthreeService],
})
export class PartthreeModule {}
