import { Module } from '@nestjs/common';
import { PartsixService } from './partsix.service';
import { PartsixController } from './partsix.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartSix, PartSixSchema } from './schema/partsix.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PartSix.name, schema: PartSixSchema }])],
  controllers: [PartsixController],
  providers: [PartsixService],
})
export class PartsixModule { }
