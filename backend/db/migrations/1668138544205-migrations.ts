import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1668138544205 implements MigrationInterface {
    name = 'migrations1668138544205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRefreshToken"`);
    }

}
