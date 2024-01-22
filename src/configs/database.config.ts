import { ConfigFactory } from '@nestjs/config';
import * as Joi from 'joi';

export interface DatabaseConfig {
  url: string;
}

export const databaseConfig: ConfigFactory<DatabaseConfig> = () => {
  const config: DatabaseConfig = {
    url: process.env.DATABASE_URL,
  };

  const schema = Joi.object({
    url: Joi.string().required(),
  });

  const result = schema.validate(config);

  if (result.error instanceof Error) {
    throw result.error;
  }

  return config;
};
