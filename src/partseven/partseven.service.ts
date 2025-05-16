import { Injectable } from '@nestjs/common';
import { CreatePartsevenDto } from './dto/create-partseven.dto';
import { UpdatePartsevenDto } from './dto/update-partseven.dto';

@Injectable()
export class PartsevenService {
  create(createPartsevenDto: CreatePartsevenDto) {
    return 'This action adds a new partseven';
  }

  findAll() {
    return `This action returns all partseven`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partseven`;
  }

  update(id: number, updatePartsevenDto: UpdatePartsevenDto) {
    return `This action updates a #${id} partseven`;
  }

  remove(id: number) {
    return `This action removes a #${id} partseven`;
  }
}
