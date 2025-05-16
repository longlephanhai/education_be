import { Injectable } from '@nestjs/common';
import { CreateQuestionpartsevenDto } from './dto/create-questionpartseven.dto';
import { UpdateQuestionpartsevenDto } from './dto/update-questionpartseven.dto';

@Injectable()
export class QuestionpartsevenService {
  create(createQuestionpartsevenDto: CreateQuestionpartsevenDto) {
    return 'This action adds a new questionpartseven';
  }

  findAll() {
    return `This action returns all questionpartseven`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionpartseven`;
  }

  update(id: number, updateQuestionpartsevenDto: UpdateQuestionpartsevenDto) {
    return `This action updates a #${id} questionpartseven`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartseven`;
  }
}
