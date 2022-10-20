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
exports.ApiLog = void 0;
const typeorm_1 = require("typeorm");
let ApiLog = class ApiLog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], ApiLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiLog.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiLog.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiLog.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiLog.prototype, "hostName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApiLog.prototype, "statusCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiLog.prototype, "reqTransportLayerProtocol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiLog.prototype, "reqBody", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApiLog.prototype, "reqQuery", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApiLog.prototype, "throughputTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ApiLog.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ApiLog.prototype, "exceptionMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ApiLog.prototype, "exceptionName", void 0);
ApiLog = __decorate([
    (0, typeorm_1.Entity)({
        name: 'ApiLog',
    })
], ApiLog);
exports.ApiLog = ApiLog;
//# sourceMappingURL=api-log.entity.js.map