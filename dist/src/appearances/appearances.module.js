"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppearancesModule = void 0;
const common_1 = require("@nestjs/common");
const appearances_controller_1 = require("./appearances.controller");
const appearance_entity_1 = require("./entities/appearance.entity");
const typeorm_1 = require("@nestjs/typeorm");
const actor_entity_1 = require("../actors/entities/actor.entity");
const movies_entity_1 = require("../movies/entities/movies.entity");
const appearances_repository_1 = require("../shared/repositories/appearances.repository");
const appearances_service_1 = require("./appearances.service");
const actors_repository_1 = require("../shared/repositories/actors.repository");
const movies_repository_1 = require("../shared/repositories/movies.repository");
let AppearancesModule = class AppearancesModule {
};
AppearancesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([appearance_entity_1.Appearance, actor_entity_1.Actor, movies_entity_1.Movie])],
        controllers: [appearances_controller_1.AppearancesController],
        providers: [
            {
                provide: 'AppearancesServiceInterface',
                useClass: appearances_service_1.AppearancesService,
            },
            {
                provide: 'AppearancesRepositoryInterface',
                useClass: appearances_repository_1.AppearancesRepository,
            },
            {
                provide: 'ActorRepositoryInterface',
                useClass: actors_repository_1.ActorsRepository,
            },
            {
                provide: 'MovieRepositoryInterface',
                useClass: movies_repository_1.MoviesRepository,
            },
        ],
    })
], AppearancesModule);
exports.AppearancesModule = AppearancesModule;
//# sourceMappingURL=appearances.module.js.map