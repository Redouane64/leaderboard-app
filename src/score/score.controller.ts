import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dtos';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  async scores(@Body() data: CreateScoreDto, @Res() response: Response) {
    const score = await this.scoreService.createScore(data);
    return response.status(HttpStatus.OK).send(score);
  }

  @Get('leaderboard')
  async leaderboard(@Res() response: Response) {
    const leaderboard = await this.scoreService.getLeaderboard();
    return response.sendStatus(HttpStatus.OK).send(leaderboard);
  }
}
