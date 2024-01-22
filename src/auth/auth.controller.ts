import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto, RegisterDto } from './dtos';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
@SkipThrottle()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({operationId: 'register', summary: `Create player account`})
  @ApiBadRequestResponse()
  async register(@Body() data: RegisterDto, @Res() response: Response) {
    const authResponse = await this.authService.registerUser(data);
    return response.status(HttpStatus.OK).send(authResponse);
  }

  @Post('login')
  @ApiOperation({operationId: 'login', summary: `Login to player account`})
  @ApiBadRequestResponse()
  async login(@Body() data: LoginDto, @Res() response: Response) {
    const authResponse = await this.authService.loginUser(data);
    return response.status(HttpStatus.OK).send(authResponse);
  }
}
