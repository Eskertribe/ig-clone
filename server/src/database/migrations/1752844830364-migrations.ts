import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1752844830364 implements MigrationInterface {
  name = 'Migrations1752844830364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_to_hashtag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postId" uuid, "hashtagId" uuid, CONSTRAINT "PK_c9ddbc5d2e38c95141abf169c21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_to_hashtag" ADD CONSTRAINT "FK_5c48573d68cff160f9f25bd60f8" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_to_hashtag" ADD CONSTRAINT "FK_0ed8af78ed8bcc35caac456c739" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "hashtag_to_post"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_to_hashtag" DROP CONSTRAINT "FK_0ed8af78ed8bcc35caac456c739"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_to_hashtag" DROP CONSTRAINT "FK_5c48573d68cff160f9f25bd60f8"`,
    );
    await queryRunner.query(`DROP TABLE "post_to_hashtag"`);
  }
}
