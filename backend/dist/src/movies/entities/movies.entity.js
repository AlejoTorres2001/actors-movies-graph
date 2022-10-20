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
exports.Movie = void 0;
const swagger_1 = require("@nestjs/swagger");
const appearance_entity_1 = require("../../appearances/entities/appearance.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const classes_1 = require("@automapper/classes");
let Movie = class Movie {
};
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], Movie.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int),
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, typeorm_1.Column)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], Movie.prototype, "year", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [appearance_entity_1.Appearance]),
    (0, typeorm_1.OneToMany)(() => appearance_entity_1.Appearance, (appearance) => appearance.movie),
    (0, classes_1.AutoMap)(() => appearance_entity_1.Appearance),
    __metadata("design:type", Array)
], Movie.prototype, "appearances", void 0);
Movie = __decorate([
    (0, typeorm_1.Entity)({
        name: 'movies',
    }),
    (0, graphql_1.ObjectType)()
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=movies.entity.js.map