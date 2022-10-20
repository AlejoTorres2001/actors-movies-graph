"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_profiler_1 = require("../shared/profiles/movie-profiler");
const movies_repository_1 = require("../shared/repositories/movies.repository");
const movies_entity_1 = require("./entities/movies.entity");
const movies_controller_1 = require("./movies.controller");
const movies_service_1 = require("./movies.service");
let MoviesModule = class MoviesModule {
};
MoviesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([movies_entity_1.Movie])],
        controllers: [movies_controller_1.MoviesController],
        providers: [
            {
                provide: 'MovieRepositoryInterface',
                useClass: movies_repository_1.MoviesRepository,
            },
            {
                provide: 'MovieServiceInterface',
                useClass: movies_service_1.MoviesService,
            },
            movie_profiler_1.MovieProfile,
        ],
    })
], MoviesModule);
exports.MoviesModule = MoviesModule;
//# sourceMappingURL=movies.module.js.map