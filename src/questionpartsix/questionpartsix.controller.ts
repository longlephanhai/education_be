import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionpartsixService } from './questionpartsix.service';
import { CreateQuestionpartsixDto } from './dto/create-questionpartsix.dto';
import { UpdateQuestionpartsixDto } from './dto/update-questionpartsix.dto';

@Controller('questionpartsix')
export class QuestionpartsixController {
  constructor(private readonly questionpartsixService: QuestionpartsixService) {}

  @Post()
  create(@Body() createQuestionpartsixDto: CreateQuestionpartsixDto) {
    return this.questionpartsixService.create(createQuestionpartsixDto);
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
