/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { PromptDto } from './dto/prompt.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) { }

  @HttpCode(HttpStatus.OK)
  @ResponseMessage("Prompt response")
  @Post('prompt')
  async getPromptResponse(@Body() body: PromptDto) {
    const modifiedPrompt = `Vui lòng xem lại văn bản tiếng Anh sau đây để tìm lỗi ngữ pháp và lỗi chính tả, và cung cấp các sửa đổi và phản hồi bằng tiếng việt và cho một bài hoàn chỉnh "${body.prompt} theo chủ đề ${body.title}".`;
    return this.geminiService.getPromptResponse(modifiedPrompt,body.title);
  }

  @HttpCode(HttpStatus.OK)
  @ResponseMessage("Prompt response")
  @Get('title')
  async getTitleResponse() {
    const promptForTitle = `Create a random, simple, and clear English writing topic for TOEIC learners. The topic should be **different each time**. Just give the title only. Keep it suitable for beginner level.`;
    const title = await this.geminiService.getTitileResponse(promptForTitle);

    const promptForHints = `Provide 2-3 short writing hints (no more than 20 words each) for the topic: "${title}".`;
    const hints = await this.geminiService.getHintResponse(promptForHints);
    return { title, hints };
  }
}
