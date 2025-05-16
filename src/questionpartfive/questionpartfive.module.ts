import { Module } from '@nestjs/common';
import { QuestionpartfiveService } from './questionpartfive.service';
import { QuestionpartfiveController } from './questionpartfive.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionPartFive, QuestionPartFiveSchema } from './schema/questionpartfive.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: QuestionPartFive.name, schema: QuestionPartFiveSchema }])],
  controllers: [QuestionpartfiveController],
  providers: [QuestionpartfiveService],
})
export class QuestionpartfiveModule { }
