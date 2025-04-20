import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745146298854 implements MigrationInterface {
    name = 'Migrations1745146298854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")`);
    }

}
