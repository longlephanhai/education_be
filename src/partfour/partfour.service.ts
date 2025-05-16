import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartfourDto } from './dto/create-partfour.dto';
import { UpdatePartfourDto } from './dto/update-partfour.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PartFour } from './schema/partfour.schema';
import { Model } from 'mongoose';

@Injectable()
export class PartfourService {
  constructor(@InjectModel(PartFour.name) private partFourModel: Model<PartFour>) { }
  async create(createPartfourDto: CreatePartfourDto, file: Express.Multer.File) {
    const isExist = await this.partFourModel.findOne({ name: createPartfourDto.name });
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    return await this.partFourModel.create({ ...createPartfourDto, audioUrl: file.path });
  }

  async findAll() {
    return await this.partFourModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} partfour`;
  }

  update(id: number, updatePartfourDto: UpdatePartfourDto) {
    return `This action updates a #${id} partfour`;
  }

  remove(id: number) {
    return `This action removes a #${id} partfour`;
  }
}
