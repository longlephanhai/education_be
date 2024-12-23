/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from './schema/exam.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
