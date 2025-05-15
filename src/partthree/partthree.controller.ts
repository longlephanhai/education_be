import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartthreeService } from './partthree.service';
import { CreatePartthreeDto } from './dto/create-partthree.dto';
import { UpdatePartthreeDto } from './dto/update-partthree.dto';

@Controller('partthree')
export class PartthreeController {
  constructor(private readonly partthreeService: PartthreeService) {}

  @Post()
  create(@Body() createPartthreeDto: CreatePartthreeDto) {
    return this.partthreeService.create(createPartthreeDto);
  }

  @Get()
  findAll() {
    return this.partthreeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partthreeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartthreeDto: UpdatePartthreeDto) {
    return this.partthreeService.update(+id, updatePartthreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partthreeService.remove(+id);
  }
}
