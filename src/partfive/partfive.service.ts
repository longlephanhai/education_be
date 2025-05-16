import { Injectable } from '@nestjs/common';
import { CreatePartfiveDto } from './dto/create-partfive.dto';
import { UpdatePartfiveDto } from './dto/update-partfive.dto';

@Injectable()
export class PartfiveService {
  create(createPartfiveDto: CreatePartfiveDto) {
    return 'This action adds a new partfive';
  }

  findAll() {
    return `This action returns all partfive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partfive`;
  }

  update(id: number, updatePartfiveDto: UpdatePartfiveDto) {
    return `This action updates a #${id} partfive`;
  }

  remove(id: number) {
    return `This action removes a #${id} partfive`;
  }
}
