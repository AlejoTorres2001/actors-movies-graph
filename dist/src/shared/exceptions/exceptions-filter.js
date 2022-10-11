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
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("graphql");
const typeorm_2 = require("typeorm");
const api_log_entity_1 = require("../entities/api-log.entity");
const exception_entity_1 = require("../entities/exception.entity");
const http_error_message_entity_1 = require("../entities/http-error-message.entity");
let AllExceptionsFilter = class AllExceptionsFilter extends core_1.BaseExceptionFilter {
    constructor(exceptionRepository, apiLogRepository) {
        super();
        this.exceptionRepository = exceptionRepository;
        this.apiLogRepository = apiLogRepository;
    }
    catch(exception, host) {
        if (exception instanceof common_1.HttpException) {
            const start = Date.now();
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const request = ctx.getRequest();
            const status = exception.getStatus();
            const message = exception.message;
            const name = exception.name;
            response.status(status).json(new http_error_message_entity_1.HttpErrorMessage(status, message));
            this.apiLogRepository
                .save({
                method: request.method,
                url: request.url,
                hostName: request.hostname,
                ip: request.socket.remoteAddress,
                statusCode: status,
                exceptionMessage: message,
                exceptionName: name,
                reqTransportLayerProtocol: request.protocol,
                reqBody: JSON.stringify(request.body),
                reqQuery: JSON.stringify(request.query),
                date: new Date(),
                throughputTime: Date.now() - start,
            })
                .catch((err) => {
                throw err;
            });
            return;
        }
        if (exception instanceof graphql_1.GraphQLError) {
            const { name, message, stack } = exception;
            this.exceptionRepository
                .save({
                message,
                name,
                stack,
                date: new Date(),
            })
                .catch((err) => {
                throw err;
            });
            return {};
        }
        if (exception instanceof Error) {
            const { name, message, stack } = exception;
            this.exceptionRepository
                .save({
                message,
                name,
                stack,
                date: new Date(),
            })
                .catch((err) => {
                throw err;
            });
            return super.catch(exception, host);
        }
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, typeorm_1.InjectRepository)(exception_entity_1.Exception)),
    __param(1, (0, typeorm_1.InjectRepository)(api_log_entity_1.ApiLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=exceptions-filter.js.map