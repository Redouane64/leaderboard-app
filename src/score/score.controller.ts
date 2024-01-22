import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('score')
export class ScoreController {
  @Get('scores')
  scores(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }

  @Get('leaderboard')
  leaderboard(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }
}
