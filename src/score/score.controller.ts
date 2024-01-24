import {
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ScoreService } from './score.service';
import { ScoreDto } from './dtos';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from './decorators';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../auth/interfaces';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Scores')
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @ApiOperation({ operationId: 'submit', summary: `Submit new score` })
  @ApiBadRequestResponse({ description: `No-admin adds score to wrong player` })
  @UseGuards(AuthGuard)
  async submit(
    @Query('score', ParseIntPipe) score: number,
    @Query('username') username: string,
    @CurrentUser() user: User,
    @Res() response: Response,
  ) {
    await this.scoreService.submitScore({ username, score }, user);
    return response.sendStatus(HttpStatus.CREATED);
  }

  @Get('leaderboard')
  @SkipThrottle()
  @ApiOperation({ operationId: 'leaderboard', summary: `Get top 10 players` })
  @ApiOkResponse({ type: [ScoreDto] })
  async leaderboard(@Res() response: Response) {
    const leaderboard = await this.scoreService.leaderboard();
    return response.status(HttpStatus.OK).send(leaderboard);
  }
}
