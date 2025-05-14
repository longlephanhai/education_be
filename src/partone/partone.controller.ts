import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile } from '@nestjs/common';
import { PartoneService } from './partone.service';
import { CreatePartoneDto } from './dto/create-partone.dto';
import { UpdatePartoneDto } from './dto/update-partone.dto';
import { AudioFile } from 'src/decorator/audio-file.decorator';
import { ResponseMessage } from 'src/decorator/customize.decorator';
@Controller('partone')
export class PartoneController {
  constructor(private readonly partoneService: PartoneService) { }

  @Post()
  @AudioFile()
  @ResponseMessage("Tạo bài thi thành công")
  create(@Body() createPartoneDto: CreatePartoneDto, @UploadedFile() file: Express.Multer.File) {
    return this.partoneService.create(createPartoneDto,file);
  }

  @Get()
  findAll() {
    return this.partoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partoneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartoneDto: UpdatePartoneDto) {
    return this.partoneService.update(+id, updatePartoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partoneService.remove(+id);
  }
}
