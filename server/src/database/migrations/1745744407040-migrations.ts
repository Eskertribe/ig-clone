import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745744407040 implements MigrationInterface {
    name = 'Migrations1745744407040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "repliesCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "likesCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "likesCount"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "repliesCount"`);
    }

}
