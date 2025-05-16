import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuestionpartfiveService } from './questionpartfive.service';
import { CreateQuestionpartfiveDto } from './dto/create-questionpartfive.dto';
import { UpdateQuestionpartfiveDto } from './dto/update-questionpartfive.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questionpartfive')
export class QuestionpartfiveController {
  constructor(private readonly questionpartfiveService: QuestionpartfiveService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionpartfiveDto: CreateQuestionpartfiveDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionpartfiveService.create(createQuestionpartfiveDto,img);
  }

  @Get()
  findAll() {
    return this.questionpartfiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionpartfiveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionpartfiveDto: UpdateQuestionpartfiveDto) {
    return this.questionpartfiveService.update(+id, updateQuestionpartfiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionpartfiveService.remove(+id);
  }
}
