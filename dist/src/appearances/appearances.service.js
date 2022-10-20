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
exports.AppearancesService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const read_appearances_dto_1 = require("./dto/read-appearances.dto");
const appearance_entity_1 = require("./entities/appearance.entity");
let AppearancesService = class AppearancesService {
    constructor(appearancesRepository, actorsRepository, moviesRepository, classMapper) {
        this.appearancesRepository = appearancesRepository;
        this.actorsRepository = actorsRepository;
        this.moviesRepository = moviesRepository;
        this.classMapper = classMapper;
    }
    async create({ actorId, movieId, }) {
        const actor = await this.actorsRepository.findOneById(actorId);
        const movie = await this.moviesRepository.findOneById(movieId);
        if (!actor || !movie) {
            return undefined;
        }
        const newAppearance = this.appearancesRepository.create({
            actor,
            movie,
        });
        return this.classMapper.map(await this.appearancesRepository.save(newAppearance), appearance_entity_1.Appearance, read_appearances_dto_1.ReadAppearanceDto);
    }
    async findAll({ limit, offset, }) {
        return this.classMapper.mapArray(await this.appearancesRepository.findWithRelations({
            relations: ['actor', 'movie'],
            skip: offset,
            take: limit,
        }), appearance_entity_1.Appearance, read_appearances_dto_1.ReadAppearanceDto);
    }
    async findOne(id) {
        const foundAppearance = await this.appearancesRepository.findByCondition({
            where: { id: id },
            relations: ['actor', 'movie'],
        });
        return this.classMapper.map(foundAppearance, appearance_entity_1.Appearance, read_appearances_dto_1.ReadAppearanceDto);
    }
    async update(id, updateAppearanceDto) {
        const appearance = await this.findOne(id);
        const { actorId, movieId } = updateAppearanceDto;
        const actorIdForUpdate = actorId ? actorId : appearance.actor.id;
        const movieIdForUpdate = movieId ? movieId : appearance.movie.id;
        const actor = await this.actorsRepository.findOneById(actorIdForUpdate);
        const movie = await this.moviesRepository.findOneById(movieIdForUpdate);
        if (!actor || !movie || !appearance) {
            return undefined;
        }
        appearance.actor = actor;
        appearance.movie = movie;
        return this.classMapper.map(await this.appearancesRepository.save(appearance), appearance_entity_1.Appearance, read_appearances_dto_1.ReadAppearanceDto);
    }
    async remove(id) {
        const foundAppearance = await this.appearancesRepository.findOneById(id);
        if (!foundAppearance) {
            return undefined;
        }
        return this.classMapper.map(await this.appearancesRepository.remove(foundAppearance), appearance_entity_1.Appearance, read_appearances_dto_1.ReadAppearanceDto);
    }
    async createMany(appearances) {
        const actors = await this.actorsRepository.findAll();
        const movies = await this.moviesRepository.findAll();
        const newAppearances = appearances.map((appearance) => {
            const actor = actors.find((actor) => actor.id === appearance.actorId);
            const movie = movies.find((movie) => movie.id === appearance.movieId);
            return this.appearancesRepository.create({
                actor,
                movie,
            });
        });
        return this.classMapper.mapArray(await this.appearancesRepository.saveMany(newAppearances), appearance_entity_1.Appearance, read_appearances_dto_1.ReadAppearanceDto);
    }
};
AppearancesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AppearancesRepositoryInterface')),
    __param(1, (0, common_1.Inject)('ActorRepositoryInterface')),
    __param(2, (0, common_1.Inject)('MovieRepositoryInterface')),
    __param(3, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], AppearancesService);
exports.AppearancesService = AppearancesService;
//# sourceMappingURL=appearances.service.js.map