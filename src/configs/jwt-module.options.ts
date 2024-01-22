import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigProps } from '.';

export const jwtModuleOptions: JwtModuleAsyncOptions = {
  global: true,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtModuleOptions => {
    const jwtConfig = configService.get<ConfigProps['auth']>('auth');
    return {
      global: true,
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expires },
    };
  },
};
