/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Favourite } from './schema/favourite.schema';
import { Model } from 'mongoose';


@Injectable()
export class FavouriteService {
  constructor(@InjectModel(Favourite.name) private favouriteModel: Model<Favourite>) { }
  async create(createFavouriteDto: CreateFavouriteDto, user) {
    const isExist = await this.favouriteModel.findOne({ vocbId: createFavouriteDto.vocbId, userId: user.userId });
    if (isExist) {
      throw new BadRequestException('Đã thêm vào danh sách');
    }
    const newFavorite = await this.favouriteModel.create({
      ...createFavouriteDto,
      userId: user.userId,
      isDeleted: false,
      isFavourite: true,
    })
    return newFavorite;
  }

  async findAll(user: any) {
    const favourites = await this.favouriteModel.find({ userId: user.userId, isDeleted: false }).populate('vocbId');
    return favourites;
  }

  findOne(id: number) {
    return `This action returns a #${id} favourite`;
  }

  update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
    return `This action updates a #${id} favourite`;
  }

  async remove(id: string, user: any) {
    const isExist = await this.favouriteModel.findOne({ vocbId: id, userId: user.userId });
    if (!isExist) {
      throw new BadRequestException('Không tìm thấy từ vựng trong danh sách');
    }
    return await this.favouriteModel.deleteOne({ vocbId: id, userId: user.userId });
  }
}
