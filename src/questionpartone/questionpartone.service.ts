import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionpartoneDto } from './dto/create-questionpartone.dto';
import { UpdateQuestionpartoneDto } from './dto/update-questionpartone.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionPartOne } from './schema/questionpartone.schema';
import mongoose, { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionpartoneService {
  constructor(
    @InjectModel(QuestionPartOne.name)
    private questionModal: Model<QuestionPartOne>,
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

  async create(createQuestionpartoneDto: CreateQuestionpartoneDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);

    return await this.questionModal.create({ ...createQuestionpartoneDto, imageUrl: imageUrl?.secure_url });
  }

  findAll() {
    return `This action returns all questionpartone`;
  }

  async findOne(id: String) {
    return await this.questionModal.find({
      partOneId: id,
    })
  }

  update(id: number, updateQuestionpartoneDto: UpdateQuestionpartoneDto) {
    return `This action updates a #${id} questionpartone`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartone`;
  }
}
