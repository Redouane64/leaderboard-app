import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesColumn1705944573226 implements MigrationInterface {
  name = 'AddRolesColumn1705944573226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" jsonb NOT NULL DEFAULT '["user"]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
  }
}
