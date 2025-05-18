import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionpartfiveDto } from './dto/create-questionpartfive.dto';
import { UpdateQuestionpartfiveDto } from './dto/update-questionpartfive.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionPartFive } from './schema/questionpartfive.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionpartfiveService {
  constructor(
    @InjectModel(QuestionPartFive.name)
    private questionModal: Model<QuestionPartFive>,
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

  async create(createQuestionpartfiveDto: CreateQuestionpartfiveDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);

    return await this.questionModal.create({ ...createQuestionpartfiveDto, imageUrl: imageUrl?.secure_url });
  }

  findAll() {
    return `This action returns all questionpartfive`;
  }

  async findOne(id: string) {
    return await this.questionModal.find({
      partFiveId:id
    })
  }

  update(id: number, updateQuestionpartfiveDto: UpdateQuestionpartfiveDto) {
    return `This action updates a #${id} questionpartfive`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartfive`;
  }
}
