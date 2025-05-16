import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParttwoDto } from './dto/create-parttwo.dto';
import { UpdateParttwoDto } from './dto/update-parttwo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PartTwo } from './schema/parttwo.schema';
import { Model } from 'mongoose';

@Injectable()
export class ParttwoService {
  constructor(@InjectModel(PartTwo.name) private partTwoModel: Model<PartTwo>) { }
  async create(createParttwoDto: CreateParttwoDto, file: Express.Multer.File) {
    const isExist = await this.partTwoModel.findOne({ name: createParttwoDto.name });
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    const newPartTwo = await this.partTwoModel.create({ ...createParttwoDto, audioUrl: file.path });
    return newPartTwo
  }

  async findAll() {
    return await this.partTwoModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} parttwo`;
  }

  update(id: number, updateParttwoDto: UpdateParttwoDto) {
    return `This action updates a #${id} parttwo`;
  }

  remove(id: number) {
    return `This action removes a #${id} parttwo`;
  }
}
