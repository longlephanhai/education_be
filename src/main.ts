/* eslint-disable prettier/prettier */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './core/transform.interceptor';
import * as express from 'express';
import { join } from 'path'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  // config global pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  // config versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2', '3']
  });

  // config global interceptor
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // config cors
  app.enableCors(
    {
      "origin": true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204,
      credentials: true
    }
  );

  app.use('/uploads/audio', express.static(join(__dirname, '..', 'uploads/audio')));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(port);
}
bootstrap();
