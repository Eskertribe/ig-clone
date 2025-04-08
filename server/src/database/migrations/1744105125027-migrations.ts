import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1744105125027 implements MigrationInterface {
  name = 'Migrations1744105125027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7"`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "profilePicture" TO "profilePictureId"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePictureId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "profilePictureId" uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "file" (id, name, "mimeType") VALUES ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111.png', 'image/png') ON CONFLICT DO NOTHING`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`);
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePictureId"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "profilePictureId" character varying NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "profilePictureId" TO "profilePicture"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5e15d5c09884be054d56fd40fb7" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
