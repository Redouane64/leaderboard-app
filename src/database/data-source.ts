import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config({ path: '.env' });

export default new DataSource({
  type: 'postgres',
  applicationName: 'LeaderboardApp',
  url: process.env.DATABASE_URL,
  migrationsTransactionMode: 'all',
  migrations: ['./dist/migrations/**/*.js'],
  entities: ['./dist/**/*.entity.js'],
  synchronize: false,
  logger: 'advanced-console',
  logging: 'all',
});
