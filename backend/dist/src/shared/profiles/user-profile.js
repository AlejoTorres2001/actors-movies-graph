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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const core_1 = require("@automapper/core");
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../../users/dto/create-user.dto");
const read_user_dto_1 = require("../../users/dto/read-user.dto");
const update_user_dto_1 = require("../../users/dto/update-user.dto");
const user_entity_1 = require("../../users/entities/user.entity");
let UserProfile = class UserProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, user_entity_1.User, read_user_dto_1.ReadUserDto);
            (0, core_1.createMap)(mapper, create_user_dto_1.CreateUserDto, user_entity_1.User, (0, core_1.forMember)((dest) => dest.id, (0, core_1.ignore)()));
            (0, core_1.createMap)(mapper, update_user_dto_1.UpdateUserDto, user_entity_1.User);
        };
    }
};
UserProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], UserProfile);
exports.UserProfile = UserProfile;
//# sourceMappingURL=user-profile.js.map