/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as textToSpeech from '@google-cloud/text-to-speech';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ChatGptService {
  private openai: OpenAI;
  private ttsClient: textToSpeech.TextToSpeechClient;
  private apiKey: string;
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = new OpenAI({
      apiKey: this.apiKey
    });

    // Khởi tạo client của Google Cloud Text-to-Speech
    this.ttsClient = new textToSpeech.TextToSpeechClient();
  }

  private conversationHistory: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: 'You are an English speaking coach. Ask questions even if the feedback sent to you is empty and correct the user\'s answers.' },
  ];
  // Lấy phản hồi từ OpenAI GPT
  async getChatGptResponse(text: string): Promise<string> {
    try {
      this.conversationHistory.push({ role: 'user', content: text });

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: this.conversationHistory,
        max_tokens: 30,
      });

      const message = response.choices && response.choices[0]?.message?.content;
      if (!message) {
        throw new Error('No valid response from GPT');
      }
      this.conversationHistory.push({ role: 'assistant', content: message });
      return message.trim();
    } catch (error) {
      if (error.response && error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`Failed to get GPT response: ${error.message}`);
    }
  }

  // Chuyển đổi văn bản thành giọng nói
  async convertTextToSpeech(text: string): Promise<Buffer> {
    try {
      const [response] = await this.ttsClient.synthesizeSpeech({
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      });
      if (!Buffer.isBuffer(response.audioContent)) {
        throw new Error('Invalid audio content received');
      }
      return response.audioContent;
    } catch (error) {
      console.error('Error converting text to speech:', error);
      throw new Error('Failed to convert text to speech');
    }
  }
}
