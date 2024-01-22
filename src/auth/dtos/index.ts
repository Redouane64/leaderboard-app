import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

const MinimumAllowedPasswordLength = 3;

export class RegisterDto implements Pick<User, 'name'> {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MinimumAllowedPasswordLength)
  password: string;
}

export class LoginDto implements Pick<RegisterDto, 'name'> {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(MinimumAllowedPasswordLength)
  password: string;
}

export class AuthenticationResponse {
  name: string;
  accessToken: string;
}
