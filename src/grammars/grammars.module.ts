/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GrammarsService } from './grammars.service';
import { GrammarsController } from './grammars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grammar, GrammarSchema } from './schema/grammar.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Grammar.name, schema: GrammarSchema }])],
  controllers: [GrammarsController],
  providers: [GrammarsService],
})
export class GrammarsModule { }
