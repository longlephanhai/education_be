import { Injectable } from '@nestjs/common';
import { CreateQuestionpartsixDto } from './dto/create-questionpartsix.dto';
import { UpdateQuestionpartsixDto } from './dto/update-questionpartsix.dto';

@Injectable()
export class QuestionpartsixService {
  create(createQuestionpartsixDto: CreateQuestionpartsixDto) {
    return 'This action adds a new questionpartsix';
  }

  findAll() {
    return `This action returns all questionpartsix`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionpartsix`;
  }

  update(id: number, updateQuestionpartsixDto: UpdateQuestionpartsixDto) {
    return `This action updates a #${id} questionpartsix`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartsix`;
  }
}
