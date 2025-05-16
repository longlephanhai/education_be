import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { QuestionPartThree } from './schema/questionpartthree.schema';
import { CreateQuestionpartthreeDto } from './dto/create-questionpartthree.dto';
import { UpdateQuestionpartthreeDto } from './dto/update-questionpartthree.dto';

@Injectable()
export class QuestionpartthreeService {
  constructor(
    @InjectModel(QuestionPartThree.name)
    private questionModal: Model<QuestionPartThree>,
    private cloudinary: CloudinaryService,
  ) { }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async create(createQuestionpartthreeDto: CreateQuestionpartthreeDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);

    return await this.questionModal.create({ ...createQuestionpartthreeDto, imageUrl: imageUrl?.secure_url });
  }

  findAll() {
    return `This action returns all questionpartfour`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionpartfour`;
  }

  update(id: number, updateQuestionpartthreeDto: UpdateQuestionpartthreeDto) {
    return `This action updates a #${id} questionpartfour`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartfour`;
  }
}
