import { ConfigFactory } from '@nestjs/config';
import * as Joi from 'joi';

export interface ApiThrottlerConfig {
  limit: number;
  ttl: number;
}

export const apiThrottlerConfig: ConfigFactory<ApiThrottlerConfig> = () => {
  const config: ApiThrottlerConfig = {
    limit: +process.env.API_RATE_LIMIT,
    ttl: +process.env.API_RATE_LIMIT_TTL,
  };

  const schema = Joi.object<ApiThrottlerConfig>({
    limit: Joi.number().required(),
    ttl: Joi.number().required(),
  });

  const result = schema.validate(config);

  if (result.error instanceof Error) {
    throw result.error;
  }

  return config;
};
