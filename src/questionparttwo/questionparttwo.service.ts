import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionparttwoDto } from './dto/create-questionparttwo.dto';
import { UpdateQuestionparttwoDto } from './dto/update-questionparttwo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionPartTwo } from './schema/questionparttwo.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionparttwoService {
  constructor(
    @InjectModel(QuestionPartTwo.name)
    private questionModal: Model<QuestionPartTwo>,
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
  async create(createQuestionparttwoDto: CreateQuestionparttwoDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);
    return await this.questionModal.create({
      ...createQuestionparttwoDto,
      imageUrl: imageUrl?.secure_url,
    })
  }

  findAll() {
    return `This action returns all questionparttwo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionparttwo`;
  }

  update(id: number, updateQuestionparttwoDto: UpdateQuestionparttwoDto) {
    return `This action updates a #${id} questionparttwo`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionparttwo`;
  }
}
