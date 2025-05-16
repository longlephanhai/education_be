import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartsevenDto } from './dto/create-partseven.dto';
import { UpdatePartsevenDto } from './dto/update-partseven.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PartSeven } from './schema/partseven.schema';
import { Model } from 'mongoose';

@Injectable()
export class PartsevenService {
  constructor(@InjectModel(PartSeven.name) private partSevenModel: Model<PartSeven>) { }
  async create(createPartsevenDto: CreatePartsevenDto) {
    const isExist = await this.partSevenModel.findOne({ name: createPartsevenDto.name });
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    return await this.partSevenModel.create({ ...createPartsevenDto });
  }

  async findAll() {
    return await this.partSevenModel.find()
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
