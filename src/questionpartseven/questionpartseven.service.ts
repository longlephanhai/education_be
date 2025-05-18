import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionpartsevenDto } from './dto/create-questionpartseven.dto';
import { UpdateQuestionpartsevenDto } from './dto/update-questionpartseven.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionPartSeven } from './schema/questionpartseven.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionpartsevenService {
  constructor(
    @InjectModel(QuestionPartSeven.name)
    private questionModal: Model<QuestionPartSeven>,
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
  async create(createQuestionpartsevenDto: CreateQuestionpartsevenDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);
    return await this.questionModal.create({ ...createQuestionpartsevenDto, imageUrl: imageUrl?.secure_url });
  }

  findAll() {
    return `This action returns all questionpartseven`;
  }

  async findOne(id: string) {
    return await this.questionModal.find({
      partSevenId: id,
    });
  }

  update(id: number, updateQuestionpartsevenDto: UpdateQuestionpartsevenDto) {
    return `This action updates a #${id} questionpartseven`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartseven`;
  }
}
