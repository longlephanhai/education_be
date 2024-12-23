/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách thành công')
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật thành công')
  @UseInterceptors(FileInterceptor('avatar'))
  update(@Param('id') id: string, @Body() updateUserDto: any, @UploadedFile() avatar: Express.Multer.File) {
    if (avatar === undefined) {
      avatar = null;
    }
    return this.usersService.update(id, updateUserDto, avatar);
  }

  @Delete(':id')
  @ResponseMessage('Xóa thành công')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
