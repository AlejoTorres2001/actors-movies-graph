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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_entity_1 = require("./entities/movies.entity");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const http_error_message_entity_1 = require("../shared/entities/http-error-message.entity");
let MoviesController = class MoviesController {
    constructor(MoviesService) {
        this.MoviesService = MoviesService;
    }
    async getMovies(pagination) {
        let foundMovies;
        try {
            foundMovies = await this.MoviesService.findAll(pagination);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (foundMovies.length === 0) {
            throw new common_1.NotFoundException(`Movies with name ${pagination.title} not found.`);
        }
        return foundMovies;
    }
    async getMovieById(id) {
        let foundMovie;
        try {
            foundMovie = await this.MoviesService.findOne(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!foundMovie) {
            throw new common_1.NotFoundException(`Movie with ID ${id} not found.`);
        }
        return foundMovie;
    }
    async createMovie(Body) {
        try {
            return await this.MoviesService.create(Body);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateMovie(id, Body) {
        let updatedMovie;
        try {
            updatedMovie = await this.MoviesService.update(id, Body);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!updatedMovie) {
            throw new common_1.NotFoundException(`Movie with ID ${id} not found.`);
        }
        return updatedMovie;
    }
    async deleteMovie(id) {
        let removedMovie;
        try {
            removedMovie = await this.MoviesService.remove(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (!removedMovie) {
            throw new common_1.NotFoundException(`Movie with ID ${id} not found.`);
        }
    }
    async CreateMany(movies) {
        let createdMovies;
        try {
            createdMovies = await this.MoviesService.createMany(movies);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        if (createdMovies.length === 0) {
            throw new common_1.NotFoundException(`no movies data provided`);
        }
        return createdMovies;
    }
};
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: [dto_1.ReadMovieDto] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.MoviesQueryDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovies", null);
__decorate([
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the movie',
    }),
    (0, swagger_1.ApiCreatedResponse)({ type: dto_1.ReadMovieDto }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovieById", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: dto_1.ReadMovieDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.createMovieDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "createMovie", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: dto_1.ReadMovieDto }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, swagger_1.ApiBody)({ type: dto_1.updateMovieDto }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the movie',
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.updateMovieDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "updateMovie", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        type: null,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Movie not found',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id of the movie',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Post)('/many'),
    (0, swagger_1.ApiCreatedResponse)({ type: [movies_entity_1.Movie] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ type: http_error_message_entity_1.HttpErrorMessage }),
    (0, swagger_1.ApiBody)({ type: [dto_1.createMovieDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "CreateMany", null);
MoviesController = __decorate([
    (0, swagger_1.ApiTags)('movies'),
    (0, common_1.Controller)('api/movies'),
    __param(0, (0, common_1.Inject)('MovieServiceInterface')),
    __metadata("design:paramtypes", [Object])
], MoviesController);
exports.MoviesController = MoviesController;
//# sourceMappingURL=movies.controller.js.map