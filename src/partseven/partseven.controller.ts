import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartsevenService } from './partseven.service';
import { CreatePartsevenDto } from './dto/create-partseven.dto';
import { UpdatePartsevenDto } from './dto/update-partseven.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('partseven')
export class PartsevenController {
  constructor(private readonly partsevenService: PartsevenService) { }

  @Post()
  @ResponseMessage("Tạo bài thi thành công")
  create(@Body() createPartsevenDto: CreatePartsevenDto) {
    return this.partsevenService.create(createPartsevenDto);
  }

  @Get()
  findAll() {
    return this.partsevenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partsevenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartsevenDto: UpdatePartsevenDto) {
    return this.partsevenService.update(+id, updatePartsevenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partsevenService.remove(+id);
  }
}
