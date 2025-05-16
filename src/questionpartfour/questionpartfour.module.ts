import { Module } from '@nestjs/common';
import { QuestionpartfourService } from './questionpartfour.service';
import { QuestionpartfourController } from './questionpartfour.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionPartFour, QuestionPartFourSchema } from './schema/questionpartfour.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: QuestionPartFour.name, schema: QuestionPartFourSchema }])],
  controllers: [QuestionpartfourController],
  providers: [QuestionpartfourService],
})
export class QuestionpartfourModule { }
