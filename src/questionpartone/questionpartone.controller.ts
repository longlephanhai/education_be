import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionpartoneService } from './questionpartone.service';
import { CreateQuestionpartoneDto } from './dto/create-questionpartone.dto';
import { UpdateQuestionpartoneDto } from './dto/update-questionpartone.dto';

@Controller('questionpartone')
export class QuestionpartoneController {
  constructor(private readonly questionpartoneService: QuestionpartoneService) { }

  @Post()
  create(@Body() createQuestionpartoneDto: CreateQuestionpartoneDto) {
    return this.questionpartoneService.create(createQuestionpartoneDto);
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
