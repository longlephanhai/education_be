import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionpartfourDto } from './dto/create-questionpartfour.dto';
import { UpdateQuestionpartfourDto } from './dto/update-questionpartfour.dto';
import { InjectModel } from '@nestjs/mongoose';
import { QuestionPartFour } from './schema/questionpartfour.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionpartfourService {
  constructor(
    @InjectModel(QuestionPartFour.name)
    private questionModal: Model<QuestionPartFour>,
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

  async create(createQuestionpartfourDto: CreateQuestionpartfourDto, img: Express.Multer.File) {
    let imageUrl = null;
    imageUrl = await this.uploadImageToCloudinary(img);

    return await this.questionModal.create({ ...createQuestionpartfourDto, imageUrl: imageUrl?.secure_url });
  }

  findAll() {
    return `This action returns all questionpartfour`;
  }

  async findOne(id: string) {
    return await this.questionModal.find({
      partFourId: id,
    })
  }

  update(id: number, updateQuestionpartfourDto: UpdateQuestionpartfourDto) {
    return `This action updates a #${id} questionpartfour`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionpartfour`;
  }
}
