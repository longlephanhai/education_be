import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionPartThree, QuestionPartThreeSchema } from './schema/questionpartthree.schema';
import { QuestionpartthreeController } from './questionpartthree.controller';
import { QuestionpartthreeService } from './questionpartthree.service';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: QuestionPartThree.name, schema: QuestionPartThreeSchema }])],
  controllers: [QuestionpartthreeController],
  providers: [QuestionpartthreeService],
})
export class QuestionpartthreeModule { }
