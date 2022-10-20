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
exports.ActorsService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const dto_1 = require("./dto");
const actor_entity_1 = require("./entities/actor.entity");
let ActorsService = class ActorsService {
    constructor(actorsRepository, classMapper) {
        this.actorsRepository = actorsRepository;
        this.classMapper = classMapper;
    }
    async create(createActorDto) {
        const newActor = this.actorsRepository.create(createActorDto);
        return this.classMapper.map(await this.actorsRepository.save(newActor), actor_entity_1.Actor, dto_1.ReadActorDto);
    }
    async findAll({ limit, offset, name, }) {
        const foundActors = name
            ? await this.actorsRepository.findAll({
                where: { name: (0, typeorm_1.Like)(`%${name}%`) },
                skip: offset,
                take: limit,
                order: {
                    id: 'ASC',
                },
            })
            : await this.actorsRepository.findAll({
                skip: offset,
                take: limit,
            });
        return this.classMapper.mapArray(foundActors, actor_entity_1.Actor, dto_1.ReadActorDto);
    }
    async findOne(id) {
        const foundActor = await this.actorsRepository.findOneById(id);
        return this.classMapper.map(foundActor, actor_entity_1.Actor, dto_1.ReadActorDto);
    }
    async update(id, updateActorDto) {
        const updatedActor = await this.actorsRepository.preload(Object.assign({ id: id }, updateActorDto));
        if (!updatedActor) {
            return undefined;
        }
        return this.classMapper.map(await this.actorsRepository.save(updatedActor), actor_entity_1.Actor, dto_1.ReadActorDto);
    }
    async remove(id) {
        const foundActor = await this.actorsRepository.findOneById(id);
        if (!foundActor) {
            return undefined;
        }
        return this.classMapper.map(await this.actorsRepository.remove(foundActor), actor_entity_1.Actor, dto_1.ReadActorDto);
    }
    async createMany(actors) {
        const newActors = this.actorsRepository.createMany(actors);
        return this.classMapper.mapArray(await this.actorsRepository.saveMany(newActors), actor_entity_1.Actor, dto_1.ReadActorDto);
    }
};
ActorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ActorRepositoryInterface')),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, Object])
], ActorsService);
exports.ActorsService = ActorsService;
//# sourceMappingURL=actors.service.js.map