import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1695522518986 implements MigrationInterface {
    name = 'CreateTables1695522518986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "feeling_journal_helper" (
                "feeling_journal_helper_id" SERIAL NOT NULL,
                "last_feeling_journal_id" integer DEFAULT '0',
                "last_feeling_journal_count" integer DEFAULT '0',
                CONSTRAINT "PK_feeling_journal_helper_id" PRIMARY KEY ("feeling_journal_helper_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "self_care_activitie" (
                "self_care_activitie_id" SERIAL NOT NULL,
                "feeling_journal_id" integer NOT NULL,
                "title" character varying NOT NULL,
                "done" boolean NOT NULL DEFAULT false,
                "remember_me" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_self_care_activitie_id" PRIMARY KEY ("self_care_activitie_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "feeling_journal" (
                "feeling_journal_id" SERIAL NOT NULL,
                "count" integer NOT NULL,
                "date" date NOT NULL,
                "closed" boolean NOT NULL DEFAULT false,
                "description" text,
                "how_was_today" character varying,
                CONSTRAINT "PK_feeling_journal_id" PRIMARY KEY ("feeling_journal_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_feeling_journal_date" ON "feeling_journal" ("date")
        `);
        await queryRunner.query(`
            CREATE TABLE "happening_diary" (
                "happening_diary_id" SERIAL NOT NULL,
                "feeling_journal_id" integer NOT NULL,
                "description" character varying NOT NULL,
                "how_i_felt" character varying NOT NULL,
                CONSTRAINT "PK_happening_diary_id" PRIMARY KEY ("happening_diary_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "self_care_activitie"
            ADD CONSTRAINT "FK_self_care_activitie_feeling_journal" FOREIGN KEY ("feeling_journal_id") REFERENCES "feeling_journal"("feeling_journal_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "happening_diary"
            ADD CONSTRAINT "FK_happening_diary_feeling_journal" FOREIGN KEY ("feeling_journal_id") REFERENCES "feeling_journal"("feeling_journal_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "happening_diary" DROP CONSTRAINT "FK_happening_diary_feeling_journal"
        `);
        await queryRunner.query(`
            ALTER TABLE "self_care_activitie" DROP CONSTRAINT "FK_self_care_activitie_feeling_journal"
        `);
        await queryRunner.query(`
            DROP TABLE "happening_diary"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_feeling_journal_date"
        `);
        await queryRunner.query(`
            DROP TABLE "feeling_journal"
        `);
        await queryRunner.query(`
            DROP TABLE "self_care_activitie"
        `);
        await queryRunner.query(`
            DROP TABLE "feeling_journal_helper"
        `);
    }

}
