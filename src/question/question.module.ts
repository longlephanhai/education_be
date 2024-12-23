/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schema/question.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule { }
