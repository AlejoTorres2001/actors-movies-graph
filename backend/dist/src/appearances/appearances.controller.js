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
exports.AppearancesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_error_message_entity_1 = require("../shared/entities/http-error-message.entity");
const dto_1 = require("./dto");
const read_appearances_dto_1 = require("./dto/read-appearances.dto");
const appearance_entity_1 = require("./entities/appearance.entity");
let AppearancesController = class AppearancesController {
    constructor(appearancesService) {
        this.appearancesService = appearancesService;
    }
    async create(createAppearanceDto) {
        let createdAppearance;
        try {
            createdAppearance = await this.appearancesService.create(createAppearanceDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!createdAppearance) {
            throw new common_1.InternalServerErrorException(`actor ${createAppearanceDto.actorId} or movie ${createAppearanceDto.movieId} not found  `);
        }
        return createdAppearance;
    }
    async findAll(pagination) {
        let foundAppearances;
        try {
            foundAppearances = await this.appearancesService.findAll(pagination);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (foundAppearances.length === 0) {
            throw new common_1.NotFoundException(`no Appearances found.`);
        }
        return foundAppearances;
    }
    async findOne(id) {
        let foundAppearance;
        try {
            foundAppearance = await this.appearancesService.findOne(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!foundAppearance) {
            throw new common_1.NotFoundException(`Appearance with ID ${id} not found.`);
        }
        return foundAppearance;
    }
    async update(id, updateAppearanceDto) {
        let updatedAppearance;
        try {
            updatedAppearance = await this.appearancesService.update(id, updateAppearanceDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!updatedAppearance) {
            throw new common_1.NotFoundException(`Appearance with ID ${id}, Movie with ID ${updateAppearanceDto === null || updateAppearanceDto === void 0 ? void 0 : updateAppearanceDto.movieId} or Actor ID ${updateAppearanceDto === null || updateAppearanceDto === void 0 ? void 0 : updateAppearanceDto.actorId} not found.`);
        }
        return updatedAppearance;
    }
    async remove(id) {
        let removedAppearance;
        try {
            removedAppearance = await this.appearancesService.remove(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!removedAppearance) {
            throw new common_1.NotFoundException(`Actor with ID ${id} not found.`);
        }
    }
    async createMany(createAppearanceDto) {
        let createdAppearances;
        try {
            createdAppearances = await this.appearancesService.createMany(createAppearanceDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (createdAppearances.length === 0) {
            throw new common_1.NotFoundException(`no Appearances created. Check if the actors and movies exist`);
        }
        return createdAppearances;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        type: appearance_entity_1.Appearance,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAppearanceDto]),
    __metadata("design:returntype", Promise)
], AppearancesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: read_appearances_dto_1.ReadAppearanceDto,
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AppearancesQueryDto]),
    __metadata("design:returntype", Promise)
], AppearancesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({
        type: http_error_message_entity_1.HttpErrorMessage,
    }),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({
        type: appearance_entity_1.Appearance,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the appearance',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppearancesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({
        type: http_error_message_entity_1.HttpErrorMessage,
    }),
    (0, swagger_1.ApiCreatedResponse)({ type: appearance_entity_1.Appearance }),
    (0, swagger_1.ApiBody)({ type: dto_1.UpdateAppearanceDto }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the appearance',
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateAppearanceDto]),
    __metadata("design:returntype", Promise)
], AppearancesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiNotFoundResponse)({
        type: http_error_message_entity_1.HttpErrorMessage,
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the appearance',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppearancesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/many'),
    (0, swagger_1.ApiCreatedResponse)({ type: [appearance_entity_1.Appearance] }),
    (0, swagger_1.ApiBody)({ type: [dto_1.CreateAppearanceDto] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        type: http_error_message_entity_1.HttpErrorMessage,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppearancesController.prototype, "createMany", null);
AppearancesController = __decorate([
    (0, swagger_1.ApiTags)('appearances'),
    (0, common_1.Controller)('api/appearances'),
    __param(0, (0, common_1.Inject)('AppearancesServiceInterface')),
    __metadata("design:paramtypes", [Object])
], AppearancesController);
exports.AppearancesController = AppearancesController;
//# sourceMappingURL=appearances.controller.js.map