import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuestionpartsevenService } from './questionpartseven.service';
import { CreateQuestionpartsevenDto } from './dto/create-questionpartseven.dto';
import { UpdateQuestionpartsevenDto } from './dto/update-questionpartseven.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questionpartseven')
export class QuestionpartsevenController {
  constructor(private readonly questionpartsevenService: QuestionpartsevenService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionpartsevenDto: CreateQuestionpartsevenDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionpartsevenService.create(createQuestionpartsevenDto, img);
  }

  @Get()
  findAll() {
    return this.questionpartsevenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionpartsevenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionpartsevenDto: UpdateQuestionpartsevenDto) {
    return this.questionpartsevenService.update(+id, updateQuestionpartsevenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionpartsevenService.remove(+id);
  }
}
