import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto, RegisterDto } from './dtos';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto, @Res() response: Response) {
    const authResponse = await this.authService.registerUser(data);
    return response.status(HttpStatus.OK).send(authResponse);
  }

  @Post('login')
  async login(@Body() data: LoginDto, @Res() response: Response) {
    const authResponse = await this.authService.loginUser(data);
    return response.status(HttpStatus.OK).send(authResponse);
  }
}
