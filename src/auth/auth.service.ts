import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationResponse } from './dtos';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export const defaultRoles = ['player'];

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async authenticate(username: string): Promise<AuthenticationResponse> {
    const roles = [...defaultRoles];

    const result = await this.repository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({ username, roles })
      .orUpdate(['username'], ['username'])
      .returning(['id', 'username'])
      .execute();

    const [data] = result.raw;

    const token = await this.jwtService.signAsync({
      id: data.id,
      username: data.username,
      roles: data.roles,
    });

    return { username, token };
  }
}
