import { Module } from '@nestjs/common';
import { PartsevenService } from './partseven.service';
import { PartsevenController } from './partseven.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartSeven, PartSevenSchema } from './schema/partseven.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartSeven.name, schema: PartSevenSchema }])],
  controllers: [PartsevenController],
  providers: [PartsevenService],
})
export class PartsevenModule { }
