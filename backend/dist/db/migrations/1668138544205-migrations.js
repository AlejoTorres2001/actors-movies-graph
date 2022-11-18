"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations1668138544205 = void 0;
class migrations1668138544205 {
    constructor() {
        this.name = 'migrations1668138544205';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "hashedRefreshToken" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashedRefreshToken"`);
    }
}
exports.migrations1668138544205 = migrations1668138544205;
//# sourceMappingURL=1668138544205-migrations.js.map