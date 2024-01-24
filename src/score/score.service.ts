import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './interfaces';
import { UserEntity } from '../auth/entities/user.entity';
import { User } from '../auth/interfaces';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async submitScore(data: Score, user: User): Promise<void> {
    // check if user is not an admin and is updating other player score
    if (!user.roles.includes('admin') && user.username !== data.username) {
      throw new BadRequestException('You cannot set other players score.');
    }

    if (!data.username) {
      data.username = user.username;
    }

    await this.repository.update(
      {
        username: data.username,
      },
      {
        score: data.score,
      },
    );
  }

  async leaderboard() {
    const entities = await this.repository.find({
      select: ['username', 'score'],
      order: { score: 'DESC' },
      take: 10,
    });

    return entities.map((e) => ({ username: e.username, score: e.score }));
  }
}
