/* eslint-disable prettier/prettier */
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function AudioFile() {
  return UseInterceptors(
    FileInterceptor('audioUrl', {
      storage: diskStorage({
        destination: './uploads/audio', // Thư mục lưu trữ file
        filename: (req, file, callback) => {
          const fileName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedExtensions = /mp3|wav|ogg/;
        const extnameValid = allowedExtensions.test(extname(file.originalname).toLowerCase());
        if (extnameValid) {
          return callback(null, true);
        } else {
          callback(new Error('Chỉ chấp nhận file âm thanh có đuôi .mp3, .wav, .ogg'), false);
        }
      },
    }),
  );
}
