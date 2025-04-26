import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745659953920 implements MigrationInterface {
    name = 'Migrations1745659953920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "parentCommentId" uuid`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "parentCommentId"`);
    }

}
