import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../interfaces';

const MinimumAllowedPasswordLength = 3;

export class RegisterDto implements Pick<User, 'name'> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(MinimumAllowedPasswordLength)
  password: string;
}

export class LoginDto implements Pick<RegisterDto, 'name' | 'password'> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(MinimumAllowedPasswordLength)
  password: string;
}

export class AuthenticationResponse {
  name: string;
  accessToken: string;
}
