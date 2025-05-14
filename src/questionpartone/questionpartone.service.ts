import { Injectable } from '@nestjs/common';
import { CreateQuestionpartoneDto } from './dto/create-questionpartone.dto';
import { UpdateQuestionpartoneDto } from './dto/update-questionpartone.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionPartOne } from './schema/questionpartone.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionpartoneService {
  constructor(
    @InjectModel(QuestionPartOne.name)
    private questionModal: Model<QuestionPartOne>,
    private cloudinary: CloudinaryService,
  ) { }
  create(createQuestionpartoneDto: CreateQuestionpartoneDto) {
    return 'This action adds a new questionpartone';
  }

  findAll() {
    return `This action returns all questionpartone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionpartone`;
  }

  update(id: number, updateQuestionpartoneDto: UpdateQuestionpartoneDto) {
    return `This action updates a #${id} questionpartone`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartone`;
  }
}
