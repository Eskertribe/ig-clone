import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1752843510521 implements MigrationInterface {
    name = 'Migrations1752843510521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_347ce7a07457528a1779da8b8f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_347ce7a07457528a1779da8b8f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3f56a3157b50bc8adcc6acf27"`);
        await queryRunner.query(`CREATE TABLE "hashtag_to_post" ("hashtag_id" uuid NOT NULL, "post_id" uuid NOT NULL, CONSTRAINT "PK_5d6fe07a39be86a88bbcc68dea2" PRIMARY KEY ("hashtag_id", "post_id"))`);
        await queryRunner.query(`ALTER TABLE "hashtag_to_post" ADD CONSTRAINT "FK_057a729b2144a2ba79c490ddeba" FOREIGN KEY ("hashtag_id") REFERENCES "hashtag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hashtag_to_post" ADD CONSTRAINT "FK_5e1d1d5b4acb869747d5c39a02c" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_347ce7a07457528a1779da8b8f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_followers" DROP CONSTRAINT "FK_347ce7a07457528a1779da8b8f3"`);
        await queryRunner.query(`ALTER TABLE "hashtag_to_post" DROP CONSTRAINT "FK_5e1d1d5b4acb869747d5c39a02c"`);
        await queryRunner.query(`ALTER TABLE "hashtag_to_post" DROP CONSTRAINT "FK_057a729b2144a2ba79c490ddeba"`);
        await queryRunner.query(`DROP TABLE "hashtag_to_post"`);
        await queryRunner.query(`CREATE INDEX "IDX_c3f56a3157b50bc8adcc6acf27" ON "user_followers" ("followerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_347ce7a07457528a1779da8b8f" ON "user_followers" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_followers" ADD CONSTRAINT "FK_347ce7a07457528a1779da8b8f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
