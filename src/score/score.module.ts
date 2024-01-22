import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ScoreController],
  providers: [ScoreService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class ScoreModule {}
