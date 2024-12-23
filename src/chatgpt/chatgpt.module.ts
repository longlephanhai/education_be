/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';
import { ChatGptController } from './chatgpt.controller';

@Module({
  controllers: [ChatGptController],
  providers: [ChatGptService],
})
export class ChatGptModule { }
