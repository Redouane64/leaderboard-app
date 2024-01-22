import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/app.config';
import dataSource from './database/data-source';

async function bootstrap() {
  await dataSource.initialize();
  Logger.log(`Running database migrations...`);
  await dataSource.runMigrations();
  Logger.log(`Migrations ran successfully`);
  await dataSource.destroy();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  await app.listen(appConfig.port);
  const url = await app.getUrl();
  Logger.log(`Server is listening on ${url}`);
}
bootstrap();