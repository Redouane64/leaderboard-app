import { Controller, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { UsernameValidationPipe } from './validation/username-validation.pipe';

@ApiTags('Auth')
@Controller('auth')
@SkipThrottle()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    operationId: 'authenticate',
    summary: `Create player or login`,
  })
  @ApiBadRequestResponse()
  async authenticate(
    @Query('username', UsernameValidationPipe) username: string,
    @Res() response: Response,
  ) {
    const player = await this.authService.authenticate(username);
    return response.status(HttpStatus.OK).send(player);
  }
}
