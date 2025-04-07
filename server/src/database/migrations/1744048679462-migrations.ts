import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1744048679462 implements MigrationInterface {
  name = 'Migrations1744048679462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "profilePicture" character varying NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
  }
}
