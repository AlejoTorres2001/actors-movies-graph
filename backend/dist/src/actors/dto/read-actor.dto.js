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
exports.ReadActorDto = void 0;
const classes_1 = require("@automapper/classes");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let ReadActorDto = class ReadActorDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, classes_1.AutoMap)(),
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], ReadActorDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsAscii)(),
    (0, classes_1.AutoMap)(),
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], ReadActorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, classes_1.AutoMap)(),
    (0, graphql_1.Field)((type) => graphql_1.Int),
    __metadata("design:type", Number)
], ReadActorDto.prototype, "birthYear", void 0);
ReadActorDto = __decorate([
    (0, graphql_1.ObjectType)()
], ReadActorDto);
exports.ReadActorDto = ReadActorDto;
//# sourceMappingURL=read-actor.dto.js.map