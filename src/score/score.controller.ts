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
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/interfaces';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Scores')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @ApiOperation({operationId: 'addScore', summary: `Add score`})
  @ApiBadRequestResponse({description: `No-admin adds score to wrong player` })
  @UseGuards(AuthGuard)
  async scores(@Body() data: CreateScoreDto, @CurrentUser() user: User, @Res() response: Response) {
    await this.scoreService.createScore(data, user);
    return response.sendStatus(HttpStatus.CREATED);
  }

  @Get('leaderboard')
  @SkipThrottle()
  @ApiOperation({operationId: 'leaderboard', summary: `Get top 10 players`})
  @ApiOkResponse({ type: LeaderboardResponse })
  async leaderboard(@Res() response: Response) {
    const leaderboard = await this.scoreService.getLeaderboard();
    return response.status(HttpStatus.OK).send(leaderboard);
  }
}
