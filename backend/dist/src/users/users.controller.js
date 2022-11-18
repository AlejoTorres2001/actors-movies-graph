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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const read_user_dto_1 = require("./dto/read-user.dto");
const http_error_message_entity_1 = require("../shared/entities/http-error-message.entity");
const users_query_dto_1 = require("./dto/users-query.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findAll(pagination) {
        let foundUsers;
        try {
            foundUsers = await this.usersService.findAll(pagination);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (foundUsers.length === 0) {
            throw new common_1.NotFoundException(`User with username like  ${pagination.username} not found.`);
        }
        return foundUsers;
    }
    async findOne(id) {
        let foundUser;
        try {
            foundUser = await this.usersService.findOne(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!foundUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found.`);
        }
        return foundUser;
    }
    async update(id, updateUserDto) {
        let updatedUser;
        try {
            updatedUser = await this.usersService.update(id, updateUserDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found.`);
        }
        return updatedUser;
    }
    async remove(id) {
        let removedUser;
        try {
            removedUser = await this.usersService.remove(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!removedUser) {
            throw new common_1.NotFoundException(`User with ID ${id} not found.`);
        }
    }
    async createMany(users) {
        let createdUsers;
        try {
            createdUsers = await this.usersService.createMany(users);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (createdUsers.length === 0) {
            throw new common_1.NotFoundException(`no User data provided`);
        }
        return createdUsers;
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: read_user_dto_1.ReadUserDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: [read_user_dto_1.ReadUserDto] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_query_dto_1.UsersQueryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Id of the User',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, swagger_1.ApiCreatedResponse)({ type: read_user_dto_1.ReadUserDto }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Id of the user',
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Id of the user',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/many'),
    (0, swagger_1.ApiCreatedResponse)({ type: [read_user_dto_1.ReadUserDto] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, swagger_1.ApiBody)({ type: [create_user_dto_1.CreateUserDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createMany", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('/api/users'),
    __param(0, (0, common_1.Inject)('UsersServiceInterface')),
    __metadata("design:paramtypes", [Object])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map