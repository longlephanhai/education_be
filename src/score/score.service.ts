import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './schema/score.schema';
import { Model } from 'mongoose';

@Injectable()
export class ScoreService {
  constructor(@InjectModel(Score.name) private scoreModel: Model<Score>, ) { }

  async create(createScoreDto: CreateScoreDto,user: any) {
    const newScore=await this.scoreModel.create({
      ...createScoreDto,
      isDeleted: false,
    })
    return newScore;
  }
  findAll(user: any) {
    return this.scoreModel.find({ userId: user.userId, isDeleted: false }).populate('examId')
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
