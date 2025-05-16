import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionpartsevenService } from './questionpartseven.service';
import { CreateQuestionpartsevenDto } from './dto/create-questionpartseven.dto';
import { UpdateQuestionpartsevenDto } from './dto/update-questionpartseven.dto';

@Controller('questionpartseven')
export class QuestionpartsevenController {
  constructor(private readonly questionpartsevenService: QuestionpartsevenService) {}

  @Post()
  create(@Body() createQuestionpartsevenDto: CreateQuestionpartsevenDto) {
    return this.questionpartsevenService.create(createQuestionpartsevenDto);
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
