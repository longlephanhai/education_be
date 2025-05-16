import { Module } from '@nestjs/common';
import { QuestionpartsixService } from './questionpartsix.service';
import { QuestionpartsixController } from './questionpartsix.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionPartSix, QuestionPartSixSchema } from './schema/questionpartsix.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: QuestionPartSix.name, schema: QuestionPartSixSchema }])],
  controllers: [QuestionpartsixController],
  providers: [QuestionpartsixService],
})
export class QuestionpartsixModule { }
