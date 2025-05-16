import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartthreeDto } from './dto/create-partthree.dto';
import { UpdatePartthreeDto } from './dto/update-partthree.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PartThree } from './schema/partthree.schema';
import { Model } from 'mongoose';

@Injectable()
export class PartthreeService {
  constructor(@InjectModel(PartThree.name) private partThreeModel: Model<PartThree>) { }

  async create(createPartthreeDto: CreatePartthreeDto, file: Express.Multer.File) {
    const isExist = await this.partThreeModel.findOne({ name: createPartthreeDto.name })
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    return await this.partThreeModel.create({ ...createPartthreeDto, audioUrl: file.path });
  }

  async findAll() {
    return await this.partThreeModel.find()
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
