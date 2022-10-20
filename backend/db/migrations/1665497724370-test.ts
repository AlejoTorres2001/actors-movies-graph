import { MigrationInterface, QueryRunner } from "typeorm";

export class test1665497724370 implements MigrationInterface {
    name = 'test1665497724370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Exception" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "name" character varying NOT NULL, "stack" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_11744eac9148626f64e6d26c412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ApiLog" ("id" SERIAL NOT NULL, "method" character varying NOT NULL, "url" character varying NOT NULL, "ip" character varying NOT NULL, "hostName" character varying NOT NULL, "statusCode" integer NOT NULL, "reqTransportLayerProtocol" character varying NOT NULL, "reqBody" character varying NOT NULL, "reqQuery" character varying NOT NULL, "throughputTime" integer NOT NULL, "date" TIMESTAMP NOT NULL, "exceptionMessage" character varying, "exceptionName" character varying, CONSTRAINT "PK_431c8662f56421a9509b57c09ef" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ApiLog"`);
        await queryRunner.query(`DROP TABLE "Exception"`);
    }

}
