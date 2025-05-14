import { Module } from '@nestjs/common';
import { PartoneService } from './partone.service';
import { PartoneController } from './partone.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartOne, PartOneSchema } from './schema/partone.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartOne.name, schema: PartOneSchema }])],
  controllers: [PartoneController],
  providers: [PartoneService],
})
export class PartoneModule { }
