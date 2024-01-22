import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ScoreModule } from './score/score.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtModuleOptions } from './configs/jwt-module.options';
import configs from './configs';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { apiThrottlerOptions } from './configs/api-throttler.options';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './database';
import { LoggerModule } from 'nestjs-pino';
import { loggerModuleOptions } from './logger';

@Module({
  imports: [
    LoggerModule.forRootAsync(loggerModuleOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: configs,
    }),
    JwtModule.registerAsync(jwtModuleOptions),
    ThrottlerModule.forRootAsync(apiThrottlerOptions),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
