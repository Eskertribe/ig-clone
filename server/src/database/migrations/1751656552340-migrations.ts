import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1751656552340 implements MigrationInterface {
    name = 'Migrations1751656552340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "replyToComment" ("id" SERIAL NOT NULL, "parentId" uuid NOT NULL, "replyCommentId" uuid NOT NULL, CONSTRAINT "PK_91bce223f16c4ab32bff224c4dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "replyToComment" ADD CONSTRAINT "FK_74163829ce848d87b8543ec6244" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replyToComment" ADD CONSTRAINT "FK_5f739d4fad65fd40f33c8653104" FOREIGN KEY ("replyCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replyToComment" DROP CONSTRAINT "FK_5f739d4fad65fd40f33c8653104"`);
        await queryRunner.query(`ALTER TABLE "replyToComment" DROP CONSTRAINT "FK_74163829ce848d87b8543ec6244"`);
        await queryRunner.query(`DROP TABLE "replyToComment"`);
    }

}
