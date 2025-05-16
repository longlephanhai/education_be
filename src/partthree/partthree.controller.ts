import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { PartthreeService } from './partthree.service';
import { CreatePartthreeDto } from './dto/create-partthree.dto';
import { UpdatePartthreeDto } from './dto/update-partthree.dto';
import { AudioFile } from 'src/decorator/audio-file.decorator';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('partthree')
export class PartthreeController {
  constructor(private readonly partthreeService: PartthreeService) { }

  @Post()
  @AudioFile()
  @ResponseMessage("Tạo bài thi thành công")
  create(@Body() createPartthreeDto: CreatePartthreeDto, @UploadedFile() file: Express.Multer.File) {
    return this.partthreeService.create(createPartthreeDto, file);
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
