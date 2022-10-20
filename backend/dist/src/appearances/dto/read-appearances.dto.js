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
exports.ReadAppearanceDto = void 0;
const actor_entity_1 = require("../../actors/entities/actor.entity");
const movies_entity_1 = require("../../movies/entities/movies.entity");
const swagger_1 = require("@nestjs/swagger");
const classes_1 = require("@automapper/classes");
class ReadAppearanceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], ReadAppearanceDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => actor_entity_1.Actor }),
    (0, classes_1.AutoMap)(() => actor_entity_1.Actor),
    __metadata("design:type", actor_entity_1.Actor)
], ReadAppearanceDto.prototype, "actor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => movies_entity_1.Movie }),
    (0, classes_1.AutoMap)(() => movies_entity_1.Movie),
    __metadata("design:type", movies_entity_1.Movie)
], ReadAppearanceDto.prototype, "movie", void 0);
exports.ReadAppearanceDto = ReadAppearanceDto;
//# sourceMappingURL=read-appearances.dto.js.map