import { Module } from '@nestjs/common';
import { QuestionpartoneService } from './questionpartone.service';
import { QuestionpartoneController } from './questionpartone.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionPartOne, QuestionPartOneSchema } from './schema/questionpartone.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: QuestionPartOne.name, schema: QuestionPartOneSchema }])],
  controllers: [QuestionpartoneController],
  providers: [QuestionpartoneService],
})
export class QuestionpartoneModule { }
