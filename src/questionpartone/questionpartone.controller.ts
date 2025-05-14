import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuestionpartoneService } from './questionpartone.service';
import { CreateQuestionpartoneDto } from './dto/create-questionpartone.dto';
import { UpdateQuestionpartoneDto } from './dto/update-questionpartone.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questionpartone')
export class QuestionpartoneController {
  constructor(private readonly questionpartoneService: QuestionpartoneService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionpartoneDto: CreateQuestionpartoneDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionpartoneService.create(createQuestionpartoneDto, img);
  }

  @Get()
  findAll() {
    return this.questionpartoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionpartoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionpartoneDto: UpdateQuestionpartoneDto) {
    return this.questionpartoneService.update(+id, updateQuestionpartoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionpartoneService.remove(+id);
  }
}
