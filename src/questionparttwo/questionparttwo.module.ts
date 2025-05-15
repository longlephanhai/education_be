import { Module } from '@nestjs/common';
import { QuestionparttwoService } from './questionparttwo.service';
import { QuestionparttwoController } from './questionparttwo.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionPartTwo, QuestionPartTwoSchema } from './schema/questionparttwo.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: QuestionPartTwo.name, schema: QuestionPartTwoSchema }])],
  controllers: [QuestionparttwoController],
  providers: [QuestionparttwoService],
})
export class QuestionparttwoModule { }
