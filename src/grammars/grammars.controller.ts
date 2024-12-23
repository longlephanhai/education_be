/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GrammarsService } from './grammars.service';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateGrammarDto } from './dto/update-grammar.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('grammars')
export class GrammarsController {
  constructor(private readonly grammarsService: GrammarsService) { }

  @Post()
  @ResponseMessage("Tạo mới thành công")
  create(@Body() createGrammarDto: CreateGrammarDto) {
    return this.grammarsService.create(createGrammarDto);
  }

  @Get()
  @ResponseMessage("Tìm kiếm thành công")
  findAll() {
    return this.grammarsService.findAll();
  }

  @Get(':slug')
  @ResponseMessage("Tìm kiếm thành công")
  findOne(@Param('slug') slug: string) {
    return this.grammarsService.findOne(slug);
  }

  @Patch(':slug')
  @ResponseMessage("Cập nhật thành công")
  update(@Param('slug') slug: string, @Body() updateGrammarDto: UpdateGrammarDto) {
    return this.grammarsService.update(slug, updateGrammarDto);
  }

  @Delete(':id')
  @ResponseMessage("Xóa thành công")
  remove(@Param('id') id: string) {
    return this.grammarsService.remove(id);
  }
}
