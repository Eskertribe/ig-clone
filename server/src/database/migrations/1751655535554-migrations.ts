import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1751655535554 implements MigrationInterface {
    name = 'Migrations1751655535554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "isParent" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "isParent"`);
    }

}
