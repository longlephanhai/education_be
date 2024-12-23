/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vocabulary } from './schema/vocabulary.schema';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class VocabularyService {
  constructor(@InjectModel(Vocabulary.name)
  private vocbModel: Model<Vocabulary>,
    private cloudinary: CloudinaryService
  ) { }
  async uploadImageToCloudinary(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
  async create(createVocabularyDto: CreateVocabularyDto, img: Express.Multer.File) {
    const image = await this.uploadImageToCloudinary(img);
    const isExist = await this.vocbModel.findOne({ vocb: createVocabularyDto.vocb });
    if (isExist) {
      throw new BadRequestException('Từ vựng đã tồn tại');
    }
    const vocabulary = await this.vocbModel.create({ ...createVocabularyDto, img: image.secure_url });
    return {
      _id: vocabulary._id
    }
  }

  async getTitles() {
    const titles = await this.vocbModel.aggregate([
      {
        $group: {
          _id: '$title', // Nhóm theo title
          slug: { $first: '$slug' } // Lấy slug đầu tiên tương ứng
        }
      },
    ]);
    const category = await this.vocbModel.find().select('category').distinct('category');
    return {
      titles,
      category,
    };
  }

  async getSlug(slug: string) {
    const vocabulary = await this.vocbModel.find({ slug }).select('category').distinct('category');
    if (!vocabulary) {
      throw new BadRequestException('Không tìm thấy từ vựng');
    }
    return vocabulary;
  }

  async getCategory(slug: string, category: string) {
    const vocabulary = await this.vocbModel.find({ slug, category });
    if (!vocabulary) {
      throw new BadRequestException('Không tìm thấy từ vựng');
    }
    return vocabulary;
  }

  async getAllVocabulariesRandomized(params: any) {
    const count = await this.vocbModel.countDocuments(); // Đếm tổng số tài liệu
    return await this.vocbModel.aggregate([
      { $match: { category: params.title, slug: params.slug } },
      { $sample: { size: count } },
    ]);

  }

  async getRandomQuestion(params: any) {
    const count = await this.vocbModel.countDocuments();
    const randomVocabularies = await this.vocbModel.aggregate([
      { $match: { category: params.title, slug: params.slug } },
      { $sample: { size: count } }, // Lấy 'count' câu hỏi ngẫu nhiên
    ]);

    if (randomVocabularies.length === 0) {
      throw new Error('No vocabulary found');
    }

    // Duyệt qua từng từ và tạo câu hỏi với các đáp án
    const questions = await Promise.all(
      randomVocabularies.map(async (vocab) => {
        // Lấy 3 câu trả lời sai
        const wrongAnswers = await this.vocbModel.aggregate([
          { $match: { _id: { $ne: vocab._id }, category: params.title, slug: params.slug } }, // Lọc bỏ từ hiện tại
          { $sample: { size: 3 } }, // Lấy 3 câu trả lời sai
        ]);

        const correctAnswer = vocab.meaning; // Nghĩa đúng
        const answers = [
          { text: correctAnswer, isCorrect: true },
          ...wrongAnswers.map((wrong) => ({
            text: wrong.meaning,
            isCorrect: false,
          })),
        ];

        // Trộn các câu trả lời
        answers.sort(() => Math.random() - 0.5);

        return {
          question: vocab.vocb, // Câu hỏi là từ tiếng Việt
          answers: answers, // Các đáp án trộn lẫn
        };
      })
    );

    return questions;
  }


  // findAll() {
  //   return `This action returns all vocabulary`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} vocabulary`;
  // }

  // update(id: number, updateVocabularyDto: UpdateVocabularyDto) {
  //   return `This action updates a #${id} vocabulary`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} vocabulary`;
  // }


}
