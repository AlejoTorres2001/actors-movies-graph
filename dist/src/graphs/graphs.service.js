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
exports.GraphsService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const dto_1 = require("../actors/dto");
const actor_entity_1 = require("../actors/entities/actor.entity");
const dto_2 = require("../movies/dto");
const movies_entity_1 = require("../movies/entities/movies.entity");
let GraphsService = class GraphsService {
    constructor(appearancesRepository, actorsRepository, moviesRepository, classMapper) {
        this.appearancesRepository = appearancesRepository;
        this.actorsRepository = actorsRepository;
        this.moviesRepository = moviesRepository;
        this.classMapper = classMapper;
    }
    async findPaths(createGraphInput) {
        const actorFrom = await this.findActorByName(createGraphInput.actorNameFrom);
        const actorTo = await this.findActorByName(createGraphInput.actorNameTo);
        const pathsFound = await this.BFS(actorFrom, actorTo);
        return {
            actorFrom: actorFrom,
            actorTo: actorTo,
            paths: pathsFound,
        };
    }
    async generateGraph() {
        const actors = await this.actorsRepository.findWithRelations({
            relations: ['appearances', 'appearances.movie'],
        });
        const adjacencyList = actors.map(async (actor) => {
            return {
                actor: actor,
                neighbors: await this.getActorNeighbors(actor.name),
            };
        });
        return await Promise.all(adjacencyList);
    }
    async getActorNeighbors(actorName) {
        const actor = await this.findActorByName(actorName, [
            'appearances',
            'appearances.movie',
        ]);
        const neighborsPromiseArray = actor.appearances.map(async (appearance) => {
            const movie = appearance.movie;
            const MovieAppearances = await this.appearancesRepository.findWithRelations({
                where: { movie: movie },
                relations: ['actor', 'movie'],
            });
            const neighbors = MovieAppearances.filter((a) => a.actor.id !== actor.id).map((a) => {
                return { actor: a.actor, movie: a.movie };
            });
            return neighbors;
        });
        const neighborsArray = await Promise.all(neighborsPromiseArray);
        return neighborsArray.flat();
    }
    async BFS(actorFrom, actorTo) {
        const pathsFound = [];
        const explored = new Set();
        const queue = [[{ actor: actorFrom, movie: null }]];
        if (actorFrom.id === actorTo.id) {
            return pathsFound;
        }
        while (queue.length > 0) {
            const path = queue.shift();
            const actor = path.slice(-1)[0].actor;
            if (!explored.has(actor.id)) {
                const neighbors = await this.getActorNeighbors(actor.name);
                for (const neighbor of neighbors) {
                    const newPath = [...path, neighbor];
                    if (neighbor.actor.id === actorTo.id) {
                        pathsFound.push(newPath);
                    }
                    else {
                        queue.push(newPath);
                    }
                }
                explored.add(actor.id);
            }
        }
        return pathsFound;
    }
    async findActorByName(actorName, relations = []) {
        const actor = await this.actorsRepository.findByCondition({
            where: { name: actorName },
            relations: relations,
        });
        return actor;
    }
    async findMovieByTitle(movieTitle, relations = []) {
        const movie = await this.moviesRepository.findByCondition({
            where: { title: movieTitle },
            relations: relations,
        });
        return movie;
    }
    async getActorMovies(actorName) {
        const actor = await this.findActorByName(actorName, [
            'appearances',
            'appearances.movie',
        ]);
        if (!actor) {
            return [];
        }
        return this.classMapper.mapArray(actor.appearances.map((a) => a.movie), movies_entity_1.Movie, dto_2.ReadMovieDto);
    }
    async getMovieActors(movieTitle) {
        const movie = await this.findMovieByTitle(movieTitle, [
            'appearances',
            'appearances.actor',
        ]);
        if (!movie) {
            return [];
        }
        const foundActors = movie.appearances.map((a) => a.actor);
        const array = this.classMapper.mapArray(foundActors, actor_entity_1.Actor, dto_1.ReadActorDto);
        return array;
    }
};
GraphsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AppearancesRepositoryInterface')),
    __param(1, (0, common_1.Inject)('ActorRepositoryInterface')),
    __param(2, (0, common_1.Inject)('MovieRepositoryInterface')),
    __param(3, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], GraphsService);
exports.GraphsService = GraphsService;
//# sourceMappingURL=graphs.service.js.map