/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { AudioFile } from 'src/decorator/audio-file.decorator';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import mongoose from 'mongoose';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Post()
  @AudioFile()
  @ResponseMessage("Tạo bài thi thành công")
  create(@Body() createExamDto: CreateExamDto, @UploadedFile() file: Express.Multer.File) {
    return this.examService.create(createExamDto, file);
  }

  @Get()
  @ResponseMessage("Lấy tiêu đề bài thi thành công")
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Lấy tiêu đề bài thi thành công")
  findOne(@Param('id') id: string) {
    return this.examService.findOne(id);
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(+id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(+id);
  }
}
