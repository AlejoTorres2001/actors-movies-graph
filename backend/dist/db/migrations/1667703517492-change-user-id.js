"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserId1667703517492 = void 0;
class changeUserId1667703517492 {
    constructor() {
        this.name = 'changeUserId1667703517492';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "userId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" TO "PK_a3ffb1c0c8416b9fc6f907b7433"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" TO "PK_8bf09ba754322ab9c22a215c919"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "id" TO "userId"`);
    }
}
exports.changeUserId1667703517492 = changeUserId1667703517492;
//# sourceMappingURL=1667703517492-change-user-id.js.map