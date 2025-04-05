import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1743853039418 implements MigrationInterface {
  name = 'Migrations1743853039418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7"`);
    await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "fileId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7"`);
    await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "fileId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
