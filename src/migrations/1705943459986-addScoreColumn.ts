import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddScoreColumn1705943459986 implements MigrationInterface {
  name = 'AddScoreColumn1705943459986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "score" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "score"`);
  }
}
