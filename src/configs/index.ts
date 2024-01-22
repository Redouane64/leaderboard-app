import { registerAs } from '@nestjs/config';
import { appConfig, AppConfig } from './app.config';
import { authConfig, AuthConfig } from './auth.config';
import { apiThrottlerConfig, ApiThrottlerConfig } from './api-throttler.config';
import { DatabaseConfig, databaseConfig } from './database.config';

export interface ConfigProps {
  app: AppConfig;
  auth: AuthConfig;
  apiThrottler: ApiThrottlerConfig;
  database: DatabaseConfig;
}

export default [
  registerAs('app', appConfig),
  registerAs('auth', authConfig),
  registerAs('apiThrottler', apiThrottlerConfig),
  registerAs('database', databaseConfig),
];
