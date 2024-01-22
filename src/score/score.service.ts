import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaderboardResponse } from './dtos';
import { UserScore } from './interfaces';
import { UserEntity } from '../auth/entities/user.entity';
import { User } from 'src/auth/interfaces';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createScore(data: UserScore, user: User): Promise<void> {
    if (!user.roles.includes('admin') && user.name !== data.name) {
      throw new BadRequestException('You cannot add score to other players.')
    }

    const entity = await this.repository.update({
      id: user.id
    }, {
      score: data.score,
    })
  }

  async getLeaderboard(): Promise<LeaderboardResponse> {
    const entities = await this.repository.find({
      select: ['name', 'score'],
      order: { score: 'DESC' },
      take: 10,
    });

    return {
      data: entities.map((e) => ({ name: e.name, score: e.score })),
    };
  }
}
