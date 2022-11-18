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
exports.ActorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_error_message_entity_1 = require("../shared/entities/http-error-message.entity");
const dto_1 = require("./dto");
const actor_entity_1 = require("./entities/actor.entity");
let ActorsController = class ActorsController {
    constructor(actorsService) {
        this.actorsService = actorsService;
    }
    async create(createActorDto) {
        try {
            return await this.actorsService.create(createActorDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findAll(pagination) {
        let foundActors;
        try {
            foundActors = await this.actorsService.findAll(pagination);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (foundActors.length === 0) {
            throw new common_1.NotFoundException(`Actors with name ${pagination.name} not found.`);
        }
        return foundActors;
    }
    async findOne(id) {
        let foundActor;
        try {
            foundActor = await this.actorsService.findOne(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!foundActor) {
            throw new common_1.NotFoundException(`Actor with ID ${id} not found.`);
        }
        return foundActor;
    }
    async update(id, updateActorDto) {
        let updatedActor;
        try {
            updatedActor = await this.actorsService.update(id, updateActorDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!updatedActor) {
            throw new common_1.NotFoundException(`Actor with ID ${id} not found.`);
        }
        return updatedActor;
    }
    async remove(id) {
        let removedActor;
        try {
            removedActor = await this.actorsService.remove(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!removedActor) {
            throw new common_1.NotFoundException(`Actor with ID ${id} not found.`);
        }
    }
    async createMany(actors) {
        let createdActors;
        try {
            createdActors = await this.actorsService.createMany(actors);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (createdActors.length === 0) {
            throw new common_1.NotFoundException(`no Actors data provided`);
        }
        return createdActors;
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: dto_1.ReadActorDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateActorDto]),
    __metadata("design:returntype", Promise)
], ActorsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: [dto_1.ReadActorDto] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ActorsQueryDto]),
    __metadata("design:returntype", Promise)
], ActorsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the actor',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ActorsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, swagger_1.ApiCreatedResponse)({ type: actor_entity_1.Actor }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateActorDto }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the actor',
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateActorDto]),
    __metadata("design:returntype", Promise)
], ActorsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the actor',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ActorsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/many'),
    (0, swagger_1.ApiCreatedResponse)({ type: [dto_1.ReadActorDto] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, swagger_1.ApiBody)({ type: [dto_1.CreateActorDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ActorsController.prototype, "createMany", null);
ActorsController = __decorate([
    (0, swagger_1.ApiTags)('actors'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('/api/actors'),
    __param(0, (0, common_1.Inject)('ActorsServiceInterface')),
    __metadata("design:paramtypes", [Object])
], ActorsController);
exports.ActorsController = ActorsController;
//# sourceMappingURL=actors.controller.js.map