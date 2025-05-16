import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionpartfiveService } from './questionpartfive.service';
import { CreateQuestionpartfiveDto } from './dto/create-questionpartfive.dto';
import { UpdateQuestionpartfiveDto } from './dto/update-questionpartfive.dto';

@Controller('questionpartfive')
export class QuestionpartfiveController {
  constructor(private readonly questionpartfiveService: QuestionpartfiveService) {}

  @Post()
  create(@Body() createQuestionpartfiveDto: CreateQuestionpartfiveDto) {
    return this.questionpartfiveService.create(createQuestionpartfiveDto);
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
