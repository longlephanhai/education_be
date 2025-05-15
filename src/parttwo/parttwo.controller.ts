import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile } from '@nestjs/common';
import { ParttwoService } from './parttwo.service';
import { CreateParttwoDto } from './dto/create-parttwo.dto';
import { UpdateParttwoDto } from './dto/update-parttwo.dto';
import { AudioFile } from 'src/decorator/audio-file.decorator';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('parttwo')
export class ParttwoController {
  constructor(private readonly parttwoService: ParttwoService) { }

  @Post()
  @AudioFile()
  @ResponseMessage("Tạo bài thi thành công")
  create(@Body() createParttwoDto: CreateParttwoDto, @UploadedFile() file: Express.Multer.File) {
    return this.parttwoService.create(createParttwoDto,file);
  }

  @Get()
  @ResponseMessage("Lấy tiêu đề bài thi thành công")
  findAll() {
    return this.parttwoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parttwoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParttwoDto: UpdateParttwoDto) {
    return this.parttwoService.update(+id, updateParttwoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parttwoService.remove(+id);
  }
}
