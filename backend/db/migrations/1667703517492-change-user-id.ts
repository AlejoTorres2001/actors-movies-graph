import { MigrationInterface, QueryRunner } from "typeorm";

export class changeUserId1667703517492 implements MigrationInterface {
    name = 'changeUserId1667703517492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" TO "PK_a3ffb1c0c8416b9fc6f907b7433"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" TO "PK_8bf09ba754322ab9c22a215c919"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "id" TO "userId"`);
    }

}
