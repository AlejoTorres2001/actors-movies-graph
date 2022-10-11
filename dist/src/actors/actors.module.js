"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorsModule = void 0;
const common_1 = require("@nestjs/common");
const actors_service_1 = require("./actors.service");
const actors_controller_1 = require("./actors.controller");
const actor_entity_1 = require("./entities/actor.entity");
const typeorm_1 = require("@nestjs/typeorm");
const actors_repository_1 = require("../shared/repositories/actors.repository");
let ActorsModule = class ActorsModule {
};
ActorsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([actor_entity_1.Actor])],
        controllers: [actors_controller_1.ActorsController],
        providers: [
            {
                provide: 'ActorRepositoryInterface',
                useClass: actors_repository_1.ActorsRepository,
            },
            {
                provide: 'ActorsServiceInterface',
                useClass: actors_service_1.ActorsService,
            },
        ],
    })
], ActorsModule);
exports.ActorsModule = ActorsModule;
//# sourceMappingURL=actors.module.js.map