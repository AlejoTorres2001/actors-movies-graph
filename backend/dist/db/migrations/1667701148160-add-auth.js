"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAuth1667701148160 = void 0;
class addAuth1667701148160 {
    constructor() {
        this.name = 'addAuth1667701148160';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying(70), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.addAuth1667701148160 = addAuth1667701148160;
//# sourceMappingURL=1667701148160-add-auth.js.map