import { Module } from '@nestjs/common';
import { ParttwoService } from './parttwo.service';
import { ParttwoController } from './parttwo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartTwo, PartTwoSchema } from './schema/parttwo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartTwo.name, schema: PartTwoSchema }])],
  controllers: [ParttwoController],
  providers: [ParttwoService],
})
export class ParttwoModule { }
