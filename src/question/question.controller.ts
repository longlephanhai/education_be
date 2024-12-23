/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionDto: CreateQuestionDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionService.create(createQuestionDto, img);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Lấy câu hỏi thành công")
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
