import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartsixService } from './partsix.service';
import { CreatePartsixDto } from './dto/create-partsix.dto';
import { UpdatePartsixDto } from './dto/update-partsix.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('partsix')
export class PartsixController {
  constructor(private readonly partsixService: PartsixService) { }

  @Post()
  @ResponseMessage("Tạo bài thi thành công")
  create(@Body() createPartsixDto: CreatePartsixDto) {
    return this.partsixService.create(createPartsixDto);
  }

  @Get()
  findAll() {
    return this.partsixService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsixService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartsixDto: UpdatePartsixDto) {
    return this.partsixService.update(+id, updatePartsixDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partsixService.remove(+id);
  }
}
