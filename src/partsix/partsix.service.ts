import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartsixDto } from './dto/create-partsix.dto';
import { UpdatePartsixDto } from './dto/update-partsix.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PartSix } from './schema/partsix.schema';
import { Model } from 'mongoose';

@Injectable()
export class PartsixService {
  constructor(@InjectModel(PartSix.name) private partSixModel: Model<PartSix>) { }
  async create(createPartsixDto: CreatePartsixDto) {
    const isExist = await this.partSixModel.findOne({ name: createPartsixDto.name });
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    return await this.partSixModel.create({ ...createPartsixDto });
  }

  async findAll() {
    return await this.partSixModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} partsix`;
  }

  update(id: number, updatePartsixDto: UpdatePartsixDto) {
    return `This action updates a #${id} partsix`;
  }

  remove(id: number) {
    return `This action removes a #${id} partsix`;
  }
}
