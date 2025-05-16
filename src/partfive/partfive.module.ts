import { Module } from '@nestjs/common';
import { PartfiveService } from './partfive.service';
import { PartfiveController } from './partfive.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartFive, PartFiveSchema } from './schema/partfive.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartFive.name, schema: PartFiveSchema }])],
  controllers: [PartfiveController],
  providers: [PartfiveService],
})
export class PartfiveModule { }
