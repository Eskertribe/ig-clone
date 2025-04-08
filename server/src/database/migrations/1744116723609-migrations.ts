import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1744116723609 implements MigrationInterface {
  name = 'Migrations1744116723609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "user" ADD "bio" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
  }
}
