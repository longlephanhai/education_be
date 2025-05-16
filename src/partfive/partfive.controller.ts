import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartfiveService } from './partfive.service';
import { CreatePartfiveDto } from './dto/create-partfive.dto';
import { UpdatePartfiveDto } from './dto/update-partfive.dto';

@Controller('partfive')
export class PartfiveController {
  constructor(private readonly partfiveService: PartfiveService) {}

  @Post()
  create(@Body() createPartfiveDto: CreatePartfiveDto) {
    return this.partfiveService.create(createPartfiveDto);
  }

  @Get()
  findAll() {
    return this.partfiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partfiveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartfiveDto: UpdatePartfiveDto) {
    return this.partfiveService.update(+id, updatePartfiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partfiveService.remove(+id);
  }
}
