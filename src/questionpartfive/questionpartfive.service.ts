import { Injectable } from '@nestjs/common';
import { CreateQuestionpartfiveDto } from './dto/create-questionpartfive.dto';
import { UpdateQuestionpartfiveDto } from './dto/update-questionpartfive.dto';

@Injectable()
export class QuestionpartfiveService {
  create(createQuestionpartfiveDto: CreateQuestionpartfiveDto) {
    return 'This action adds a new questionpartfive';
  }

  findAll() {
    return `This action returns all questionpartfive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionpartfive`;
  }

  update(id: number, updateQuestionpartfiveDto: UpdateQuestionpartfiveDto) {
    return `This action updates a #${id} questionpartfive`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartfive`;
  }
}
