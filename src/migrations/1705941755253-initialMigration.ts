import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1705941755253 implements MigrationInterface {
  name = 'InitialMigration1705941755253';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("name" text NOT NULL, "password_hash" text NOT NULL, CONSTRAINT "PK_51b8b26ac168fbe7d6f5653e6cf" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_51b8b26ac168fbe7d6f5653e6c" ON "users" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "scores" ("id" SERIAL NOT NULL, "user_id" text NOT NULL, CONSTRAINT "REL_683c8208c44184cae37649140c" UNIQUE ("user_id"), CONSTRAINT "PK_c36917e6f26293b91d04b8fd521" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD CONSTRAINT "FK_683c8208c44184cae37649140c0" FOREIGN KEY ("user_id") REFERENCES "users"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scores" DROP CONSTRAINT "FK_683c8208c44184cae37649140c0"`,
    );
    await queryRunner.query(`DROP TABLE "scores"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51b8b26ac168fbe7d6f5653e6c"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
