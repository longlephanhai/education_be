import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { PartfiveService } from './partfive.service';
import { CreatePartfiveDto } from './dto/create-partfive.dto';
import { UpdatePartfiveDto } from './dto/update-partfive.dto';
import { AudioFile } from 'src/decorator/audio-file.decorator';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('partfive')
export class PartfiveController {
  constructor(private readonly partfiveService: PartfiveService) { }

  @Post()
  @AudioFile()
  @ResponseMessage("Tạo bài thi thành công")
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
