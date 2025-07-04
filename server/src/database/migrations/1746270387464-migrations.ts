import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746270387464 implements MigrationInterface {
    name = 'Migrations1746270387464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "repliesCount"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "likesCount"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "commentId" uuid`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_d86e0a3eeecc21faa0da415a18a" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_d86e0a3eeecc21faa0da415a18a"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "likesCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "repliesCount" integer NOT NULL DEFAULT '0'`);
    }

}
