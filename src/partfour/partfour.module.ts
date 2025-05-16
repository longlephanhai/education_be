import { Module } from '@nestjs/common';
import { PartfourService } from './partfour.service';
import { PartfourController } from './partfour.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartFour, PartFourSchema } from './schema/partfour.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartFour.name, schema: PartFourSchema }])],
  controllers: [PartfourController],
  providers: [PartfourService],
})
export class PartfourModule { }
