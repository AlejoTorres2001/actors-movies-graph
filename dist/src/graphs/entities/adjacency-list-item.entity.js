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
exports.AdjacencyListItem = void 0;
const actor_entity_1 = require("../../actors/entities/actor.entity");
const graphql_1 = require("@nestjs/graphql");
const neighbor_entity_1 = require("./neighbor.entity");
let AdjacencyListItem = class AdjacencyListItem {
};
__decorate([
    (0, graphql_1.Field)((type) => actor_entity_1.Actor),
    __metadata("design:type", actor_entity_1.Actor)
], AdjacencyListItem.prototype, "actor", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [neighbor_entity_1.Neighbor]),
    __metadata("design:type", Array)
], AdjacencyListItem.prototype, "neighbors", void 0);
AdjacencyListItem = __decorate([
    (0, graphql_1.ObjectType)()
], AdjacencyListItem);
exports.AdjacencyListItem = AdjacencyListItem;
//# sourceMappingURL=adjacency-list-item.entity.js.map