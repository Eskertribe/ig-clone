import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1743850802489 implements MigrationInterface {
  name = 'Migrations1743850802489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "mimeType" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "fileId"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "fileId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "UQ_5e15d5c09884be054d56fd40fb7" UNIQUE ("fileId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7"`);
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_5e15d5c09884be054d56fd40fb7"`);
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "fileId"`);
    await queryRunner.query(`ALTER TABLE "post" ADD "fileId" character varying NOT NULL`);
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
