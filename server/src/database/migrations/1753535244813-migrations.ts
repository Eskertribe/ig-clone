import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1753535244813 implements MigrationInterface {
    name = 'Migrations1753535244813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "createdById" uuid`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_c681529d2e6afa4aed28ef53b08" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_c681529d2e6afa4aed28ef53b08"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "createdAt"`);
    }

}
