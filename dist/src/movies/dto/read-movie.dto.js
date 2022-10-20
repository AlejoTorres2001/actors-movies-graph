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
exports.ReadMovieDto = void 0;
const classes_1 = require("@automapper/classes");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
let ReadMovieDto = class ReadMovieDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, classes_1.AutoMap)(),
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], ReadMovieDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsAscii)(),
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], ReadMovieDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsNumber)(),
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], ReadMovieDto.prototype, "year", void 0);
ReadMovieDto = __decorate([
    (0, graphql_1.ObjectType)()
], ReadMovieDto);
exports.ReadMovieDto = ReadMovieDto;
//# sourceMappingURL=read-movie.dto.js.map