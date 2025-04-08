import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1744116110520 implements MigrationInterface {
  name = 'Migrations1744116110520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_followers" ("userId" uuid NOT NULL, "followerId" uuid NOT NULL, CONSTRAINT "PK_2ef3f0032f555df18ddc38c4552" PRIMARY KEY ("userId", "followerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_347ce7a07457528a1779da8b8f" ON "user_followers" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3f56a3157b50bc8adcc6acf27" ON "user_followers" ("followerId") `,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "profilePictureId" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_347ce7a07457528a1779da8b8f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_c3f56a3157b50bc8adcc6acf278" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_c3f56a3157b50bc8adcc6acf278"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_347ce7a07457528a1779da8b8f3"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "profilePictureId" SET DEFAULT '00000000-0000-0000-0000-000000000000'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_c3f56a3157b50bc8adcc6acf27"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_347ce7a07457528a1779da8b8f"`);
    await queryRunner.query(`DROP TABLE "user_followers"`);
  }
}
