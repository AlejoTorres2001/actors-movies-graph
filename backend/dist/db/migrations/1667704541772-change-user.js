"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUser1667704541772 = void 0;
class changeUser1667704541772 {
    constructor() {
        this.name = 'changeUser1667704541772';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }
}
exports.changeUser1667704541772 = changeUser1667704541772;
//# sourceMappingURL=1667704541772-change-user.js.map