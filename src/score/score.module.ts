import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserScoreEntity } from './entities/user-score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserScoreEntity])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
