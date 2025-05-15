import { Module } from '@nestjs/common';
import { PartthreeService } from './partthree.service';
import { PartthreeController } from './partthree.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartThree, PartThreeSchema } from './schema/partthree.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartThree.name, schema: PartThreeSchema }])],
  controllers: [PartthreeController],
  providers: [PartthreeService],
})
export class PartthreeModule { }
