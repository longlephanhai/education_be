/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) { }

  @Post()
  @ResponseMessage('Tạo tài liệu thành công')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createDocDto: CreateDocDto, @UploadedFile() file: Express.Multer.File) {
    return this.docService.create(createDocDto, file);
  }

  @Get()
  @ResponseMessage('Lấy danh sách tài liệu thành công')
  findAll() {
    return this.docService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin tài liệu thành công')
  findOne(@Param('id') id: string) {
    return this.docService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    return this.docService.update(+id, updateDocDto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa tài liệu thành công')
  remove(@Param('id') id: string) {
    return this.docService.remove(id);
  }
}
