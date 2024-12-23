/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schema/question.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionService {
  constructor(@InjectModel(Question.name)
  private questionModal: Model<Question>,
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
  async create(createQuestionDto: CreateQuestionDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);

    return await this.questionModal.create({ ...createQuestionDto, imageUrl: imageUrl?.secure_url });
  }

  findAll() {
    return `This action returns all question`;
  }

  async findOne(id: string) {
    const data = await this.questionModal.find({ examId: id })
    return data;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
