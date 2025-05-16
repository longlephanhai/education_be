import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuestionpartsixService } from './questionpartsix.service';
import { CreateQuestionpartsixDto } from './dto/create-questionpartsix.dto';
import { UpdateQuestionpartsixDto } from './dto/update-questionpartsix.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questionpartsix')
export class QuestionpartsixController {
  constructor(private readonly questionpartsixService: QuestionpartsixService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionpartsixDto: CreateQuestionpartsixDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionpartsixService.create(createQuestionpartsixDto,img);
  }

  @Get()
  findAll() {
    return this.questionpartsixService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionpartsixService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionpartsixDto: UpdateQuestionpartsixDto) {
    return this.questionpartsixService.update(+id, updateQuestionpartsixDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionpartsixService.remove(+id);
  }
}
