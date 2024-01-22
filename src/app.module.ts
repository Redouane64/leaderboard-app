import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ScoreModule } from './score/score.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtModuleOptions } from './configs/jwt-module.options';
import configs from './configs';
import { ThrottlerModule } from '@nestjs/throttler';
import { apiThrottlerOptions } from './configs/api-throttler.options';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: configs,
    }),
    JwtModule.registerAsync(jwtModuleOptions),
    ThrottlerModule.forRootAsync(apiThrottlerOptions),
    AuthModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
