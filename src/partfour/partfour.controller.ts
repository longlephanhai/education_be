import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { PartfourService } from './partfour.service';
import { CreatePartfourDto } from './dto/create-partfour.dto';
import { UpdatePartfourDto } from './dto/update-partfour.dto';
import { AudioFile } from 'src/decorator/audio-file.decorator';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('partfour')
export class PartfourController {
  constructor(private readonly partfourService: PartfourService) { }

  @Post()
  @AudioFile()
  @ResponseMessage("Tạo bài thi thành công")
  create(@Body() createPartfourDto: CreatePartfourDto, @UploadedFile() file: Express.Multer.File) {
    return this.partfourService.create(createPartfourDto, file);
  }

  @Get()
  @ResponseMessage("Lấy tiêu đề bài thi thành công")
  findAll() {
    return this.partfourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partfourService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartfourDto: UpdatePartfourDto) {
    return this.partfourService.update(+id, updatePartfourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partfourService.remove(+id);
  }
}
