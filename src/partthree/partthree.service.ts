import { Injectable } from '@nestjs/common';
import { CreatePartthreeDto } from './dto/create-partthree.dto';
import { UpdatePartthreeDto } from './dto/update-partthree.dto';

@Injectable()
export class PartthreeService {
  create(createPartthreeDto: CreatePartthreeDto) {
    return 'This action adds a new partthree';
  }

  findAll() {
    return `This action returns all partthree`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partthree`;
  }

  update(id: number, updatePartthreeDto: UpdatePartthreeDto) {
    return `This action updates a #${id} partthree`;
  }

  remove(id: number) {
    return `This action removes a #${id} partthree`;
  }
}
