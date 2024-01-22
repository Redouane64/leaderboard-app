import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import * as util from 'node:util';
import { AuthenticationResponse } from './dtos';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigProps } from 'src/configs';
import { InjectRepository } from '@nestjs/typeorm';

export const defaultRoles = ['user'];

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async registerUser(
    data: Pick<User, 'name' | 'password'>,
  ): Promise<AuthenticationResponse> {
    const jwtToken = await this.jwtService.signAsync({
      name: data.name,
      roles: defaultRoles,
    });

    const authConfig = this.configService.get<ConfigProps['auth']>('auth');

    const hash = util.promisify<
      crypto.BinaryLike,
      crypto.BinaryLike,
      number,
      Buffer
    >(crypto.scrypt);

    const passwordHash = await hash(data.password, authConfig.secret, 32);

    await this.repository.save({
      name: data.name,
      passwordHash: passwordHash.toString('base64'),
      roles: defaultRoles,
    });

    return { name: data.name, accessToken: jwtToken };
  }

  async loginUser(
    data: Pick<User, 'name' | 'password'>,
  ): Promise<AuthenticationResponse> {
    const user = await this.repository.findOne({
      where: {
        name: data.name,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }

    const hash = util.promisify<
      crypto.BinaryLike,
      crypto.BinaryLike,
      number,
      Buffer
    >(crypto.scrypt);

    const authConfig = this.configService.get<ConfigProps['auth']>('auth');
    const passwordHash = await hash(data.password, authConfig.secret, 32);

    const passwordMatch = passwordHash.toString('base64') === user.passwordHash;
    if (!passwordMatch) {
      throw new BadRequestException();
    }

    const jwtToken = await this.jwtService.signAsync({
      name: data.name,
      roles: defaultRoles,
    });

    return { name: data.name, accessToken: jwtToken };
  }
}
