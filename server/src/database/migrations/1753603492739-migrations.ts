import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1753603492739 implements MigrationInterface {
    name = 'Migrations1753603492739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "deletedAt"`);
    }

}
