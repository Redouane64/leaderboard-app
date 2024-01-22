import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserScoreEntity } from './entities/user-score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaderboardResponse } from './dtos';
import { UserScore } from './interfaces';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(UserScoreEntity)
    private readonly repository: Repository<UserScoreEntity>,
  ) {}

  async createScore(data: UserScore): Promise<UserScore> {
    const entity = await this.repository.save({
      user: {
        name: data.name,
      },
      score: data.score,
    });

    return {
      name: data.name,
      score: entity.score,
    };
  }

  async getLeaderboard(): Promise<LeaderboardResponse> {
    const entities = await this.repository.find({
      select: ['score'],
      relations: {
        user: true,
      },
      order: { score: 'DESC' },
      take: 10,
    });

    return {
      data: entities.map((e) => ({ name: e.user.name, score: e.score })),
    };
  }
}
