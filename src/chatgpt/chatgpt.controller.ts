/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Res } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';
import { Response } from 'express';
import { ResponseMessage } from 'src/decorator/customize.decorator';

@Controller('chat')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) { }

  @Post()
  @ResponseMessage('Chat GPT response')
  async chat(@Body('text') text: string, @Res() res: Response) {
    const responseText = await this.chatGptService.getChatGptResponse(text);
    const audio = await this.chatGptService.convertTextToSpeech(responseText);
    res.set('Content-Type', 'application/json');
    res.send({
      text: responseText,
      audio: `data:audio/mpeg;base64,${audio.toString('base64')}`
    });
  }
}
