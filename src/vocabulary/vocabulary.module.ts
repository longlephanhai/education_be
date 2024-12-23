/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Vocabulary, VocabularySchema } from './schema/vocabulary.schema';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([{ name: Vocabulary.name, schema: VocabularySchema }])
  ],
  controllers: [VocabularyController],
  providers: [VocabularyService],
})
export class VocabularyModule { }
