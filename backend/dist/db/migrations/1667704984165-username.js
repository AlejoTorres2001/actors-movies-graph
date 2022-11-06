"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.username1667704984165 = void 0;
class username1667704984165 {
    constructor() {
        this.name = 'username1667704984165';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }
}
exports.username1667704984165 = username1667704984165;
//# sourceMappingURL=1667704984165-username.js.map