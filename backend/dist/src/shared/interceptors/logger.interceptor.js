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
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const operators_1 = require("rxjs/operators");
const typeorm_2 = require("typeorm");
const api_log_entity_1 = require("../entities/api-log.entity");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(ApiLogRepository) {
        this.ApiLogRepository = ApiLogRepository;
    }
    intercept(context, next) {
        const start = Date.now();
        if (context.getType() === 'http') {
            const ctx = context.switchToHttp();
            const { method, url, connection, body, query, hostname } = ctx.getRequest();
            const { statusCode } = ctx.getResponse();
            return next.handle().pipe((0, operators_1.tap)(() => {
                const end = Date.now();
                this.ApiLogRepository.save({
                    method,
                    url,
                    hostName: hostname,
                    ip: connection.remoteAddress,
                    statusCode,
                    reqTransportLayerProtocol: connection.encrypted ? 'https' : 'http',
                    reqBody: JSON.stringify(body),
                    reqQuery: JSON.stringify(query),
                    throughputTime: end - start,
                    date: new Date(),
                }).catch((err) => {
                    throw err;
                });
            }));
        }
        if (context.getType() === 'graphql') {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const { req, res } = ctx.getContext();
            const { method, url, connection, body, hostname } = req;
            const { statusCode } = res;
            return next.handle().pipe((0, operators_1.tap)(() => {
                const end = Date.now();
                this.ApiLogRepository.save({
                    method,
                    url,
                    ip: connection.remoteAddress,
                    hostName: hostname,
                    statusCode,
                    reqTransportLayerProtocol: 'graphql',
                    reqBody: JSON.stringify({
                        opName: body.operationName,
                        variables: body.variables,
                    }),
                    reqQuery: JSON.stringify(body.query),
                    throughputTime: end - start,
                    date: new Date(),
                }).catch((err) => {
                    throw err;
                });
            }));
        }
        return next.handle();
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(api_log_entity_1.ApiLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logger.interceptor.js.map