import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ConfigProps } from 'src/configs';
import { UserScoreEntity } from 'src/score/entities/user-score.entity';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    const databaseConfig =
      configService.get<ConfigProps['database']>('database');
    return {
      applicationName: 'LeaderboardApp',
      type: 'postgres',
      url: databaseConfig.url,
      entities: [UserEntity, UserScoreEntity],
      synchronize: false,
      logger: 'advanced-console',
      logging: 'all',
    };
  },
};