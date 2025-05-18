import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuestionpartfourService } from './questionpartfour.service';
import { CreateQuestionpartfourDto } from './dto/create-questionpartfour.dto';
import { UpdateQuestionpartfourDto } from './dto/update-questionpartfour.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questionpartfour')
export class QuestionpartfourController {
  constructor(private readonly questionpartfourService: QuestionpartfourService) { }

  @Post()
  @ResponseMessage("Tạo mới câu hỏi thành công")
  @UseInterceptors(FileInterceptor('imageUrl'))
  create(@Body() createQuestionpartfourDto: CreateQuestionpartfourDto, @UploadedFile() img: Express.Multer.File) {
    return this.questionpartfourService.create(createQuestionpartfourDto,img);
  }

  @Get()
  findAll() {
    return this.questionpartfourService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Lấy câu hỏi part 4 thành công")
  findOne(@Param('id') id: string) {
    return this.questionpartfourService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionpartfourDto: UpdateQuestionpartfourDto) {
    return this.questionpartfourService.update(+id, updateQuestionpartfourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionpartfourService.remove(+id);
  }
}
