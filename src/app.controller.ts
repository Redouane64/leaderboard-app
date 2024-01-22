import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('/')
@Controller()
export class AppController {
  @Get('healthz')
  healthz(@Res() response: Response) {
    return response.sendStatus(HttpStatus.OK);
  }
}
