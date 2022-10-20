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
exports.GraphsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const dto_1 = require("../actors/dto");
const dto_2 = require("../movies/dto");
const entities_1 = require("./entities");
let GraphsResolver = class GraphsResolver {
    constructor(graphsService) {
        this.graphsService = graphsService;
    }
    async findPaths(actorNameFrom, actorNameTo) {
        try {
            return await this.graphsService.findPaths({
                actorNameFrom,
                actorNameTo,
            });
        }
        catch (error) {
            throw new graphql_2.GraphQLError(error.message);
        }
    }
    async generateGraph() {
        try {
            return await this.graphsService.generateGraph();
        }
        catch (error) {
            throw new graphql_2.GraphQLError(error.message);
        }
    }
    async getActorMovies(actorName) {
        let movies;
        try {
            movies = await this.graphsService.getActorMovies(actorName);
        }
        catch (error) {
            throw new graphql_2.GraphQLError(error.message);
        }
        if (movies.length === 0) {
            throw new graphql_2.GraphQLError('Actor not found');
        }
        return movies;
    }
    async getMovieActors(movieTitle) {
        let actors;
        try {
            actors = await this.graphsService.getMovieActors(movieTitle);
        }
        catch (error) {
            throw new graphql_2.GraphQLError(error.message);
        }
        if (actors.length === 0) {
            throw new graphql_2.GraphQLError('Movie not found');
        }
        return actors;
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => entities_1.Graph),
    __param(0, (0, graphql_1.Args)('actorNameFrom')),
    __param(1, (0, graphql_1.Args)('actorNameTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GraphsResolver.prototype, "findPaths", null);
__decorate([
    (0, graphql_1.Query)((returns) => [entities_1.AdjacencyListItem]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GraphsResolver.prototype, "generateGraph", null);
__decorate([
    (0, graphql_1.Query)((returns) => [dto_2.ReadMovieDto]),
    __param(0, (0, graphql_1.Args)('actorName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphsResolver.prototype, "getActorMovies", null);
__decorate([
    (0, graphql_1.Query)((returns) => [dto_1.ReadActorDto]),
    __param(0, (0, graphql_1.Args)('movieTitle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GraphsResolver.prototype, "getMovieActors", null);
GraphsResolver = __decorate([
    (0, graphql_1.Resolver)((of) => entities_1.Graph),
    __param(0, (0, common_1.Inject)('GraphsServiceInterface')),
    __metadata("design:paramtypes", [Object])
], GraphsResolver);
exports.GraphsResolver = GraphsResolver;
//# sourceMappingURL=graphs.resolver.js.map