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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from './decorators';
import { AuthenticatedUser } from 'src/auth/interfaces';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Scores')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @UseGuards(AuthGuard)
  async scores(@Body() data: CreateScoreDto, @CurrentUser() user: AuthenticatedUser, @Res() response: Response) {
    const score = await this.scoreService.createScore(data, user);
    return response.status(HttpStatus.OK).send(score);
  }

  @Get('leaderboard')
  @ApiOkResponse({ type: LeaderboardResponse })
  async leaderboard(@Res() response: Response) {
    const leaderboard = await this.scoreService.getLeaderboard();
    return response.sendStatus(HttpStatus.OK).send(leaderboard);
  }
}
