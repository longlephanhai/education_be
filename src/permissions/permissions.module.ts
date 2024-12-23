/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Perrmission, PerrmissionSchema } from './schema/permission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Perrmission.name, schema: PerrmissionSchema }])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule { }
