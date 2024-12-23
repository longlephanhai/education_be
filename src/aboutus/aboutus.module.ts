/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusController } from './aboutus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutUs, AboutUsSchema } from './schema/aboutus.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AboutUs.name, schema: AboutUsSchema }])],
  controllers: [AboutusController],
  providers: [AboutusService],
})
export class AboutusModule { }
