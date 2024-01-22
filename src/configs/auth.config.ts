import { ConfigFactory } from '@nestjs/config';
import * as Joi from 'joi';

export interface AuthConfig {
  secret: string;
  expires: string;
}

export const authConfig: ConfigFactory<AuthConfig> = () => {
  const config: AuthConfig = {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRE,
  };

  const schema = Joi.object({
    secret: Joi.string().required(),
    expires: Joi.string().required(),
  });

  const result = schema.validate(config);

  if (result.error instanceof Error) {
    throw result.error;
  }

  return config;
};
