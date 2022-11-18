"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const classes_1 = require("@automapper/classes");
const argon = require("argon2");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
let User = class User {
    async hashPassword() {
        this.password = await argon.hash(this.password);
    }
    async hashRefreshToken() {
        if (this.hashedRefreshToken) {
            this.hashedRefreshToken = await argon.hash(this.hashedRefreshToken);
        }
    }
    async validatePassword(password) {
        return await argon.verify(this.password, password);
    }
    async validateRefreshToken(refreshToken) {
        return await argon.verify(this.hashedRefreshToken, refreshToken);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsEmail)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsAlphanumeric)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.MinLength)(8),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], User.prototype, "hashedRefreshToken", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashRefreshToken", null);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map