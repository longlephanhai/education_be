/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { AccountModule } from './account/account.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { GeminiModule } from './gemini/gemini.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GrammarsModule } from './grammars/grammars.module';
import { FavouriteModule } from './favourite/favourite.module';
import { ChatGptModule } from './chatgpt/chatgpt.module';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { DocModule } from './doc/doc.module';
import { AboutusModule } from './aboutus/aboutus.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        transport: {
          host: "smtp.gmail.com",
          port: 465,
          // ignoreTLS: true,
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AccountModule,
    RolesModule,
    PermissionsModule,
    CloudinaryModule,
    VocabularyModule,
    GeminiModule,
    GrammarsModule,
    FavouriteModule,
    ChatGptModule,
    ExamModule,
    QuestionModule,
    DocModule,
    AboutusModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
