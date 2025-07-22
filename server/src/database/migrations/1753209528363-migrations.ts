import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1753209528363 implements MigrationInterface {
    name = 'Migrations1753209528363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_seen_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seenAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_6e13314409ede050ccc19d09a27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_seen_post" ADD CONSTRAINT "FK_b2baec14cdbe5af6761556a9be9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_seen_post" ADD CONSTRAINT "FK_eeb99545a376d785c2beb8f9ddd" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_seen_post" DROP CONSTRAINT "FK_eeb99545a376d785c2beb8f9ddd"`);
        await queryRunner.query(`ALTER TABLE "user_seen_post" DROP CONSTRAINT "FK_b2baec14cdbe5af6761556a9be9"`);
        await queryRunner.query(`DROP TABLE "user_seen_post"`);
    }

}
