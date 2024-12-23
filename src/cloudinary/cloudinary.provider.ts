/* eslint-disable prettier/prettier */
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get<string>('CLOUND_NAME'),
      api_key: configService.get<string>('CLOUND_KEY'),
      api_secret: configService.get<string>('CLOUND_SECRET'),
    });
  },
  inject: [ConfigService],
};
