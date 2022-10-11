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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let MoviesService = class MoviesService {
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }
    async findAll({ limit, offset, title }) {
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
        return foundMovies;
    }
    async findOne(id) {
        const foundMovie = await this.moviesRepository.findOneById(id);
        return foundMovie;
    }
    async create(MovieData) {
        const newMovie = this.moviesRepository.create(MovieData);
        return await this.moviesRepository.save(newMovie);
    }
    async update(id, updateData) {
        const updatedMovie = await this.moviesRepository.preload(Object.assign({ id: id }, updateData));
        if (!updatedMovie) {
            return undefined;
        }
        return await this.moviesRepository.save(updatedMovie);
    }
    async remove(id) {
        const movieFound = await this.moviesRepository.findOneById(id);
        if (!movieFound) {
            undefined;
        }
        return this.moviesRepository.remove(movieFound);
    }
    async createMany(movies) {
        const newMovies = this.moviesRepository.createMany(movies);
        return await this.moviesRepository.saveMany(newMovies);
    }
};
MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MovieRepositoryInterface')),
    __metadata("design:paramtypes", [Object])
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map