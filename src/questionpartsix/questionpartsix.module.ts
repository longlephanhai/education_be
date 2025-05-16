import { Module } from '@nestjs/common';
import { QuestionpartsixService } from './questionpartsix.service';
import { QuestionpartsixController } from './questionpartsix.controller';

@Module({
  controllers: [QuestionpartsixController],
  providers: [QuestionpartsixService],
})
export class QuestionpartsixModule {}
