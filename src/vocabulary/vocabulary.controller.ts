/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) { }

  @Post()
  @ResponseMessage('Tạo từ vựng thành công')
  @UseInterceptors(FileInterceptor('img'))
  create(@UploadedFile() img: Express.Multer.File, @Body() createVocabularyDto: CreateVocabularyDto,) {
    return this.vocabularyService.create(createVocabularyDto, img);
  }

  @Get('titles')
  @ResponseMessage('Lấy danh sách tiêu đề thành công')
  getTitles() {
    return this.vocabularyService.getTitles();
  }

  @Post('randomized')
  @ResponseMessage('Lấy từ vựng thành công ngẫu nhiên')
  getAllVocabulariesRandomized(@Body() params: any) {
    return this.vocabularyService.getAllVocabulariesRandomized(params);
  }

  @Post('random')
  @ResponseMessage('Lấy từ vựng thành công ngẫu nhiên')
  getRandomQuestion(@Body() params: any) {
    return this.vocabularyService.getRandomQuestion(params)
  }



  @Get(':slug')
  @ResponseMessage('Lấy từ vựng thành công')
  getSlug(@Param('slug') slug: string) {
    return this.vocabularyService.getSlug(slug);
  }

  @Get(':slug/:category')
  @ResponseMessage('Lấy từ vựng thành công')
  getCategory(@Param('slug') slug: string, @Param('category') category: string) {
    return this.vocabularyService.getCategory(slug, category);
  }


  // @Get()
  // findAll() {
  //   return this.vocabularyService.findAll();
  // }




  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vocabularyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVocabularyDto: UpdateVocabularyDto) {
  //   return this.vocabularyService.update(+id, updateVocabularyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vocabularyService.remove(+id);
  // }

}
