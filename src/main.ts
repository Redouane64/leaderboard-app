import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/app.config';
import dataSource from './database/data-source';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerErrorInterceptor, Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  await dataSource.initialize();
  Logger.log(`Running database migrations...`);
  await dataSource.runMigrations();
  Logger.log(`Migrations ran successfully`);
  await dataSource.destroy();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useLogger(app.get(PinoLogger));
  app.flushLogs();

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  const config = new DocumentBuilder()
    .setTitle('Leaderboard API')
    .setDescription('Players leaderboard API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(appConfig.port);
  const url = await app.getUrl();
  Logger.log(`Server is listening on ${url}`);
}
bootstrap();
