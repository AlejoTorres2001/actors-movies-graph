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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appearance = void 0;
const actor_entity_1 = require("../../actors/entities/actor.entity");
const movies_entity_1 = require("../../movies/entities/movies.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
let Appearance = class Appearance {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Appearance.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => actor_entity_1.Actor),
    (0, typeorm_1.ManyToOne)(() => actor_entity_1.Actor, (actor) => actor.appearances, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'actor_id' }),
    (0, swagger_1.ApiProperty)({ type: () => actor_entity_1.Actor }),
    __metadata("design:type", actor_entity_1.Actor)
], Appearance.prototype, "actor", void 0);
__decorate([
    (0, graphql_1.Field)((type) => movies_entity_1.Movie),
    (0, typeorm_1.ManyToOne)(() => movies_entity_1.Movie, (movie) => movie.appearances, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'movie_id' }),
    (0, swagger_1.ApiProperty)({ type: () => movies_entity_1.Movie }),
    __metadata("design:type", movies_entity_1.Movie)
], Appearance.prototype, "movie", void 0);
Appearance = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({
        name: 'appearances',
    })
], Appearance);
exports.Appearance = Appearance;
//# sourceMappingURL=appearance.entity.js.map