import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';

import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionpartthreeService } from './questionpartthree.service';
import { CreateQuestionpartthreeDto } from './dto/create-questionpartthree.dto';
import { UpdateQuestionpartthreeDto } from './dto/update-questionpartthree.dto';

@Controller('questionpartthree')
export class QuestionpartthreeController {
  constructor(private readonly questionpartthreeService: QuestionpartthreeService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionpartthreeDto: CreateQuestionpartthreeDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionpartthreeService.create(createQuestionpartthreeDto, img);
  }

  @Get()
  findAll() {
    return this.questionpartthreeService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Lấy câu hỏi part 3 thành công")
  findOne(@Param('id') id: string) {
    return this.questionpartthreeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionpartfourDto: UpdateQuestionpartthreeDto) {
    return this.questionpartthreeService.update(+id, updateQuestionpartfourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionpartthreeService.remove(+id);
  }
}
