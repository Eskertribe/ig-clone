import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1753529668370 implements MigrationInterface {
    name = 'Migrations1753529668370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "conversationId" uuid, "senderId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation_participants_user" ("conversationId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_25e9241137cdb0f2336d267cc99" PRIMARY KEY ("conversationId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4928ef292e3fb48783034b82f7" ON "conversation_participants_user" ("conversationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d93fb1843f96fbdefea37dae8" ON "conversation_participants_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_participants_user" ADD CONSTRAINT "FK_4928ef292e3fb48783034b82f7a" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "conversation_participants_user" ADD CONSTRAINT "FK_5d93fb1843f96fbdefea37dae86" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_participants_user" DROP CONSTRAINT "FK_5d93fb1843f96fbdefea37dae86"`);
        await queryRunner.query(`ALTER TABLE "conversation_participants_user" DROP CONSTRAINT "FK_4928ef292e3fb48783034b82f7a"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7cf4a4df1f2627f72bf6231635f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d93fb1843f96fbdefea37dae8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4928ef292e3fb48783034b82f7"`);
        await queryRunner.query(`DROP TABLE "conversation_participants_user"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "conversation"`);
    }

}
