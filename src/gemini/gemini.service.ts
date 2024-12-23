/* eslint-disable prettier/prettier */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: any;
  private genAiProModel: any;
  private genAIProVisionModel: any;
  constructor(private configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(this.configService.get('API_KEY'));
    this.genAiProModel = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    this.genAIProVisionModel = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  async getPromptResponse(prompt: string,title): Promise<string> {
    const result = await this.genAiProModel.generateContent(prompt,title);
    const response = await result.response;
    const text = response.text();
    return text;
  }
  async getTitileResponse(prompt: string): Promise<string> {
    const result = await this.genAIProVisionModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }

  async getHintResponse(prompt: string): Promise<string> {
    const result = await this.genAiProModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
  }
}
