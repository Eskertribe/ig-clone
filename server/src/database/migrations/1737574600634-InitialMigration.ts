import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1737574600634 implements MigrationInterface {
  name = 'InitialMigration1737574600634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "postId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "like" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "postId" uuid, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "asd" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hashtag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_cb36eb8af8412bfa978f1165d78" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "disableComments" boolean NOT NULL, "disableLikes" boolean NOT NULL, "fileId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hashtag_posts_post" ("hashtagId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_0fc16eacc7ebe8d4a7c0e83e8de" PRIMARY KEY ("hashtagId", "postId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04a0980616b87d9f477681a5f0" ON "hashtag_posts_post" ("hashtagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bbb3f67f64ade7ed5c24aa33fd" ON "hashtag_posts_post" ("postId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "post_hashtags_hashtag" ("postId" uuid NOT NULL, "hashtagId" uuid NOT NULL, CONSTRAINT "PK_f52ea0534f8a67570694af46898" PRIMARY KEY ("postId", "hashtagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8208b8abf539c8abf342824a34" ON "post_hashtags_hashtag" ("postId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5d6c565b7ea325e2677138c34a" ON "post_hashtags_hashtag" ("hashtagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hashtag_posts_post" ADD CONSTRAINT "FK_04a0980616b87d9f477681a5f09" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "hashtag_posts_post" ADD CONSTRAINT "FK_bbb3f67f64ade7ed5c24aa33fda" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtags_hashtag" ADD CONSTRAINT "FK_8208b8abf539c8abf342824a34a" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtags_hashtag" ADD CONSTRAINT "FK_5d6c565b7ea325e2677138c34ae" FOREIGN KEY ("hashtagId") REFERENCES "hashtag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_hashtags_hashtag" DROP CONSTRAINT "FK_5d6c565b7ea325e2677138c34ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_hashtags_hashtag" DROP CONSTRAINT "FK_8208b8abf539c8abf342824a34a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hashtag_posts_post" DROP CONSTRAINT "FK_bbb3f67f64ade7ed5c24aa33fda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hashtag_posts_post" DROP CONSTRAINT "FK_04a0980616b87d9f477681a5f09"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
    await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`);
    await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_5d6c565b7ea325e2677138c34a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8208b8abf539c8abf342824a34"`);
    await queryRunner.query(`DROP TABLE "post_hashtags_hashtag"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_bbb3f67f64ade7ed5c24aa33fd"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_04a0980616b87d9f477681a5f0"`);
    await queryRunner.query(`DROP TABLE "hashtag_posts_post"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "hashtag"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
