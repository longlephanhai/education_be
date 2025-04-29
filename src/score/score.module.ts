import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './schema/score.schema';

@Module({
   imports: [ MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
