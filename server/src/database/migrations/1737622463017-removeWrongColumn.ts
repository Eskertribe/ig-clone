import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveWrongColumn1737622463017 implements MigrationInterface {
  name = 'RemoveWrongColumn1737622463017'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "asd"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "asd" character varying NOT NULL`);
  }

}
