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
exports.MoviesService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const dto_1 = require("./dto");
const movies_entity_1 = require("./entities/movies.entity");
let MoviesService = class MoviesService {
    constructor(moviesRepository, classMapper) {
        this.moviesRepository = moviesRepository;
        this.classMapper = classMapper;
    }
    async findAll({ limit, offset, title, }) {
        const foundMovies = title
            ? await this.moviesRepository.findAll({
                where: {
                    title: (0, typeorm_1.Like)(`%${title}%`),
                },
                skip: offset,
                take: limit,
            })
            : await this.moviesRepository.findAll({
                skip: offset,
                take: limit,
            });
        return this.classMapper.mapArray(foundMovies, movies_entity_1.Movie, dto_1.ReadMovieDto);
    }
    async findOne(id) {
        const foundMovie = await this.moviesRepository.findOneById(id);
        return this.classMapper.map(foundMovie, movies_entity_1.Movie, dto_1.ReadMovieDto);
    }
    async create(MovieData) {
        const newMovie = this.moviesRepository.create(MovieData);
        return this.classMapper.map(await this.moviesRepository.save(newMovie), movies_entity_1.Movie, dto_1.ReadMovieDto);
    }
    async update(id, updateData) {
        const updatedMovie = await this.moviesRepository.preload(Object.assign({ id: id }, updateData));
        if (!updatedMovie) {
            return undefined;
        }
        return this.classMapper.map(await this.moviesRepository.save(updatedMovie), movies_entity_1.Movie, dto_1.ReadMovieDto);
    }
    async remove(id) {
        const movieFound = await this.moviesRepository.findOneById(id);
        if (!movieFound) {
            undefined;
        }
        return this.classMapper.map(await this.moviesRepository.remove(movieFound), movies_entity_1.Movie, dto_1.ReadMovieDto);
    }
    async createMany(movies) {
        const newMovies = this.moviesRepository.createMany(movies);
        return this.classMapper.mapArray(await this.moviesRepository.saveMany(newMovies), movies_entity_1.Movie, dto_1.ReadMovieDto);
    }
};
MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MovieRepositoryInterface')),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, Object])
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map