/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateGrammarDto } from './dto/update-grammar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Grammar } from './schema/grammar.schema';
import { Model } from 'mongoose';

@Injectable()
export class GrammarsService {
  constructor(@InjectModel(Grammar.name) private grammarModel: Model<Grammar>,) { }
  async create(createGrammarDto: CreateGrammarDto) {
    const isExist = await this.grammarModel.findOne({ title: createGrammarDto.title });
    if (isExist) {
      throw new Error("Ngữ pháp đã tồn tại");
    }
    const newGrammar = await this.grammarModel.create({
      ...createGrammarDto,
      isDeleted: false
    });
    return newGrammar;
  }

  async findAll() {
    return await this.grammarModel.find({
      isDeleted: false
    });
  }

  async findOne(slug: string) {
    return await this.grammarModel.findOne({ slug });
  }

  async update(slug: string, updateGrammarDto: UpdateGrammarDto) {
    const grammar = await this.grammarModel.findOne({ slug });
    if (!grammar) {
      throw new Error("Ngữ pháp không tồn tại");
    }
    await this.grammarModel.updateOne({
      slug
    }, {
      ...updateGrammarDto
    })
    return {
      ...updateGrammarDto,
      slug
    }
  }

  async remove(id: string) {
    const grammar = await this.grammarModel.findById(id);
    if (!grammar) {
      throw new Error("Ngữ pháp không tồn tại");
    }
    await this.grammarModel.updateOne({
      _id: id
    }, {
      isDeleted: true
    })
    return {
      _id: id,
    }
  }
}
