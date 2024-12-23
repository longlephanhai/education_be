/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAboutusDto } from './dto/create-aboutus.dto';
import { UpdateAboutusDto } from './dto/update-aboutus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AboutUs } from './schema/aboutus.schema';
import { Model } from 'mongoose';

@Injectable()
export class AboutusService {
  constructor(@InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUs>) { }
  async create(createAboutusDto: CreateAboutusDto) {
    const isExist = await this.aboutUsModel.findOne();
    if (isExist) {
      return await this.aboutUsModel.updateOne({
        _id: isExist._id
      }, createAboutusDto);
    } else {
      return await this.aboutUsModel.create(createAboutusDto);
    }
  }

  async findAll() {
    return await this.aboutUsModel.findOne()
  }

  async findOne(id: string) {
    return await this.aboutUsModel.findOne({ _id:id})
  }

  update(id: number, updateAboutusDto: UpdateAboutusDto) {
    return `This action updates a #${id} aboutus`;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutus`;
  }
}
