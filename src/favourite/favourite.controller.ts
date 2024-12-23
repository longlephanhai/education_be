/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { ResponseMessage, User } from 'src/decorator/customize.decorator';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) { }

  @Post()
  @ResponseMessage("Thêm thành công")
  create(@Body() createFavouriteDto: CreateFavouriteDto, @User() user) {
    return this.favouriteService.create(createFavouriteDto, user);
  }

  @Get()
  @ResponseMessage("Lấy danh sách thành công")
  findAll(@User() user: any) {
    return this.favouriteService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favouriteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavouriteDto: UpdateFavouriteDto) {
    return this.favouriteService.update(+id, updateFavouriteDto);
  }

  @Delete(':id')
  @ResponseMessage("Hủy thành công")
  remove(@Param('id') id: string, @User() user: any) {
    return this.favouriteService.remove(id, user)
  }
}
