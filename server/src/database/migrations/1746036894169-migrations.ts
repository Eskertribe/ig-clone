import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746036894169 implements MigrationInterface {
    name = 'Migrations1746036894169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id")`);
    }

}
