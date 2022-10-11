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
exports.Actor = void 0;
const swagger_1 = require("@nestjs/swagger");
const appearance_entity_1 = require("../../appearances/entities/appearance.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let Actor = class Actor {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Actor.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ required: true }),
    __metadata("design:type", String)
], Actor.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Actor.prototype, "birthYear", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [appearance_entity_1.Appearance]),
    (0, typeorm_1.OneToMany)(() => appearance_entity_1.Appearance, (appearance) => appearance.actor),
    __metadata("design:type", Array)
], Actor.prototype, "appearances", void 0);
Actor = __decorate([
    (0, typeorm_1.Entity)({
        name: 'actors',
    }),
    (0, graphql_1.ObjectType)()
], Actor);
exports.Actor = Actor;
//# sourceMappingURL=actor.entity.js.map