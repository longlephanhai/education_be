import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartfiveDto } from './dto/create-partfive.dto';
import { UpdatePartfiveDto } from './dto/update-partfive.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PartFive } from './schema/partfive.entity';
import { Model } from 'mongoose';

@Injectable()
export class PartfiveService {
  constructor(@InjectModel(PartFive.name) private partFiveModel: Model<PartFive>) { }
  async create(createPartfiveDto: CreatePartfiveDto) {
    const isExist = await this.partFiveModel.findOne({ name: createPartfiveDto.name });
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    return await this.partFiveModel.create({ ...createPartfiveDto });
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
