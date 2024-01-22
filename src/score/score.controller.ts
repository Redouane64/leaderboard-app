import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ScoreService } from './score.service';
import { CreateScoreDto, LeaderboardResponse } from './dtos';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from './decorators';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/interfaces';

@ApiTags('Scores')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @UseGuards(AuthGuard)
  async scores(@Body() data: CreateScoreDto, @CurrentUser() user: User, @Res() response: Response) {
    await this.scoreService.createScore(data, user);
    return response.sendStatus(HttpStatus.CREATED);
  }

  @Get('leaderboard')
  @ApiOkResponse({ type: LeaderboardResponse })
  async leaderboard(@Res() response: Response) {
    const leaderboard = await this.scoreService.getLeaderboard();
    return response.status(HttpStatus.OK).send(leaderboard);
  }
}
