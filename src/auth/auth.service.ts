import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import * as util from 'node:util';
import { AuthenticationResponse } from './dtos';

@Injectable()
export class AuthService {
  private readonly store: User[] = [];
  private readonly defaultRoles = ['user'];

  constructor(private readonly jwtService: JwtService) {}

  async registerUser(
    data: Pick<User, 'name' | 'password'>,
  ): Promise<AuthenticationResponse> {
    const jwtToken = await this.jwtService.signAsync({
      username: data.name,
      roles: this.defaultRoles, // default roles
    });

    const hash = util.promisify<
      crypto.BinaryLike,
      crypto.BinaryLike,
      number,
      Buffer
    >(crypto.scrypt);

    const passwordHash = await hash(data.password, 'aaa', 32);

    this.store.push({
      name: data.name,
      password: passwordHash.toString('base64'),
      roles: this.defaultRoles,
    });

    return { name: data.name, accessToken: jwtToken };
  }

  async loginUser(
    data: Pick<User, 'name' | 'password'>,
  ): Promise<AuthenticationResponse> {
    const [user] = this.store.filter((u) => u.name === data.name);

    if (!user) {
      throw new BadRequestException();
    }

    const hash = util.promisify<
      crypto.BinaryLike,
      crypto.BinaryLike,
      number,
      Buffer
    >(crypto.scrypt);

    const passwordHash = await hash(data.password, 'aaa', 32);

    const passwordMatch = passwordHash.toString('base64') === data.password;
    if (!passwordMatch) {
      throw new BadRequestException();
    }

    const jwtToken = await this.jwtService.signAsync({
      username: data.name,
      roles: this.defaultRoles, // default roles
    });

    return { name: data.name, accessToken: jwtToken };
  }
}
