/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exam } from './schema/exam.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam.name) private examModel: Model<Exam>) { }
  async create(createExamDto: CreateExamDto, file: Express.Multer.File) {
    const isExist = await this.examModel.findOne({ name: createExamDto.name });
    if (isExist) {
      throw new BadRequestException('Tiêu đề này đã tồn tại');
    }
    const newExam = await this.examModel.create({ ...createExamDto, audioUrl: file.path });
    return newExam;
  }

  async findAll() {
    return await this.examModel.find()
  }

  async findOne(id: string) {
    await this.examModel.findById(id);
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
