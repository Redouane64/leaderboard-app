import { ConfigService } from '@nestjs/config';
import {
  ThrottlerAsyncOptions,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { ConfigProps } from './';

export const apiThrottlerOptions: ThrottlerAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): ThrottlerModuleOptions => {
    const throttlerConfig =
      configService.get<ConfigProps['apiThrottler']>('apiThrottler');
    return {
      throttlers: [
        {
          limit: throttlerConfig.limit,
          ttl: throttlerConfig.ttl,
        },
      ],
    };
  },
};
