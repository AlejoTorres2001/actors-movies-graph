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
exports.Neighbor = void 0;
const graphql_1 = require("@nestjs/graphql");
const dto_1 = require("../../actors/dto");
const dto_2 = require("../../movies/dto");
let Neighbor = class Neighbor {
};
__decorate([
    (0, graphql_1.Field)((type) => dto_1.ReadActorDto),
    __metadata("design:type", dto_1.ReadActorDto)
], Neighbor.prototype, "actor", void 0);
__decorate([
    (0, graphql_1.Field)((type) => dto_2.ReadMovieDto, { nullable: true }),
    __metadata("design:type", dto_2.ReadMovieDto)
], Neighbor.prototype, "movie", void 0);
Neighbor = __decorate([
    (0, graphql_1.ObjectType)()
], Neighbor);
exports.Neighbor = Neighbor;
//# sourceMappingURL=neighbor.entity.js.map