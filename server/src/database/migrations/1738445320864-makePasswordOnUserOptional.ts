import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakePasswordOnUserOptional1738445320864 implements MigrationInterface {
  name = 'MakePasswordOnUserOptional1738445320864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
  }
}
