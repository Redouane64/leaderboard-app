import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaderboardResponse } from './dtos';
import { UserScore } from './interfaces';
import { AuthenticatedUser } from 'src/auth/interfaces';
import { UserEntity } from 'src/auth/entities/user.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createScore(data: UserScore, user: AuthenticatedUser): Promise<UserScore> {
    if (!user.roles.includes('admin') && user.name !== data.name) {
      throw new BadRequestException('You cannot add score to other players.')
    }

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
      order: { score: 'DESC' },
      take: 10,
    });

    return {
      data: entities.map((e) => ({ name: e.name, score: e.score })),
    };
  }
}
