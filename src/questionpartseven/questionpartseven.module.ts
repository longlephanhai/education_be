import { Module } from '@nestjs/common';
import { QuestionpartsevenService } from './questionpartseven.service';
import { QuestionpartsevenController } from './questionpartseven.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionPartSeven, QuestionPartSevenSchema } from './schema/questionpartseven.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: QuestionPartSeven.name, schema: QuestionPartSevenSchema }])],
  controllers: [QuestionpartsevenController],
  providers: [QuestionpartsevenService],
})
export class QuestionpartsevenModule { }
