import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1751635410521 implements MigrationInterface {
    name = 'Migrations1751635410521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`CREATE TABLE "replyComment" ("parentId" uuid NOT NULL, "replyCommentId" uuid NOT NULL, CONSTRAINT "PK_f7555b410e2f3ad648090667d0a" PRIMARY KEY ("parentId", "replyCommentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7542f667c20b7ed51431e0f6a0" ON "replyComment" ("parentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c75e332c9e8a200afa19610237" ON "replyComment" ("replyCommentId") `);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "parentCommentId"`);
        await queryRunner.query(`ALTER TABLE "replyComment" ADD CONSTRAINT "FK_7542f667c20b7ed51431e0f6a0a" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "replyComment" ADD CONSTRAINT "FK_c75e332c9e8a200afa19610237d" FOREIGN KEY ("replyCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replyComment" DROP CONSTRAINT "FK_c75e332c9e8a200afa19610237d"`);
        await queryRunner.query(`ALTER TABLE "replyComment" DROP CONSTRAINT "FK_7542f667c20b7ed51431e0f6a0a"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "parentCommentId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c75e332c9e8a200afa19610237"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7542f667c20b7ed51431e0f6a0"`);
        await queryRunner.query(`DROP TABLE "replyComment"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
