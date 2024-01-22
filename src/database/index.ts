import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { ConfigProps } from '../configs';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    const databaseConfig =
      configService.get<ConfigProps['database']>('database');
    return {
      applicationName: 'LeaderboardApp',
      type: 'postgres',
      url: databaseConfig.url,
      entities: [UserEntity],
      synchronize: false,
      logger: 'advanced-console',
      logging: 'all',
    };
  },
};
