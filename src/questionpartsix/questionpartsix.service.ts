import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionpartsixDto } from './dto/create-questionpartsix.dto';
import { UpdateQuestionpartsixDto } from './dto/update-questionpartsix.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionPartSix } from './schema/questionpartsix.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionpartsixService {
  constructor(
    @InjectModel(QuestionPartSix.name)
    private questionModal: Model<QuestionPartSix>,
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
  async create(createQuestionpartsixDto: CreateQuestionpartsixDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);
    return await this.questionModal.create({ ...createQuestionpartsixDto, imageUrl: imageUrl?.secure_url });
  }

  findAll() {
    return `This action returns all questionpartsix`;
  }

  async findOne(id: string) {
    return await this.questionModal.find({
      partSixId: id 
    })
  }

  update(id: number, updateQuestionpartsixDto: UpdateQuestionpartsixDto) {
    return `This action updates a #${id} questionpartsix`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartsix`;
  }
}
