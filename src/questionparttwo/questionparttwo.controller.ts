import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuestionparttwoService } from './questionparttwo.service';
import { CreateQuestionparttwoDto } from './dto/create-questionparttwo.dto';
import { UpdateQuestionparttwoDto } from './dto/update-questionparttwo.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questionparttwo')
export class QuestionparttwoController {
  constructor(private readonly questionparttwoService: QuestionparttwoService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionparttwoDto: CreateQuestionparttwoDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionparttwoService.create(createQuestionparttwoDto, img);
  }

  @Get()
  findAll() {
    return this.questionparttwoService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Lấy danh sách câu hỏi theo id part two thành công")
  findOne(@Param('id') id: string) {
    return this.questionparttwoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionparttwoDto: UpdateQuestionparttwoDto) {
    return this.questionparttwoService.update(+id, updateQuestionparttwoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionparttwoService.remove(+id);
  }
}
