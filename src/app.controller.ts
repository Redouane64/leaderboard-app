import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Response } from 'express';

@ApiTags('/')
@SkipThrottle()
@Controller()
export class AppController {
  @Get('healthz')
  healthz(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }
}
