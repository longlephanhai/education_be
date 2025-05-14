import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartoneDto } from './dto/create-partone.dto';
import { UpdatePartoneDto } from './dto/update-partone.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PartOne } from './schema/partone.schema';
import { Model } from 'mongoose';

@Injectable()
export class PartoneService {
  constructor(@InjectModel(PartOne.name) private partOneModel: Model<PartOne>) { }
  async create(createPartoneDto: CreatePartoneDto, file: Express.Multer.File) {
    const isExist = await this.partOneModel.findOne({ name: createPartoneDto.name });
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    const newPartone = await this.partOneModel.create({ ...createPartoneDto, audioUrl: file.path });
    return newPartone
  }

  findAll() {
    return `This action returns all partone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partone`;
  }

  update(id: number, updatePartoneDto: UpdatePartoneDto) {
    return `This action updates a #${id} partone`;
  }

  remove(id: number) {
    return `This action removes a #${id} partone`;
  }
}
