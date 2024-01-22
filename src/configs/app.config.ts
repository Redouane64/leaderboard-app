import { ConfigFactory } from '@nestjs/config';
import * as Joi from 'joi';

export interface AppConfig {
  nodeEnv: 'development' | 'production' | 'test';
  host?: string;
  port?: string;
}

export const appConfig: ConfigFactory<AppConfig> = () => {
  const config: AppConfig = {
    nodeEnv: process.env.NODE_ENV as any,
    host: process.env.HOST,
    port: process.env.PORT,
  };

  const schema = Joi.object<AppConfig>({
    nodeEnv: Joi.string().valid('development', 'production', 'test').required(),
    host: Joi.string().optional().default('localhost'),
    port: Joi.number().optional().default(80),
  });

  const result = schema.validate(config);

  if (result.error instanceof Error) {
    throw result.error;
  }

  return config;
};
