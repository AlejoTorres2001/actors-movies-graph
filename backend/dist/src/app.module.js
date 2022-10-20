"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const movies_module_1 = require("./movies/movies.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const actors_module_1 = require("./actors/actors.module");
const appearances_module_1 = require("./appearances/appearances.module");
const app_controller_1 = require("./app.controller");
const graphs_module_1 = require("./graphs/graphs.module");
const api_log_entity_1 = require("./shared/entities/api-log.entity");
const logger_interceptor_1 = require("./shared/interceptors/logger.interceptor");
const api_timeout_interceptor_1 = require("./shared/interceptors/api-timeout.interceptor");
const exception_entity_1 = require("./shared/entities/exception.entity");
const core_1 = require("@nestjs/core");
const exceptions_filter_1 = require("./shared/exceptions/exceptions-filter");
const data_source_1 = require("../db/data-source");
const configuration_1 = require("../config/configuration");
const nestjs_1 = require("@automapper/nestjs");
const classes_1 = require("@automapper/classes");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.AutomapperModule.forRoot({
                strategyInitializer: (0, classes_1.classes)(),
            }),
            movies_module_1.MoviesModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({ useFactory: () => data_source_1.dataSourceOptions }),
            actors_module_1.ActorsModule,
            appearances_module_1.AppearancesModule,
            graphs_module_1.GraphsModule,
            typeorm_1.TypeOrmModule.forFeature([api_log_entity_1.ApiLog]),
            typeorm_1.TypeOrmModule.forFeature([exception_entity_1.Exception]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: 'APP_INTERCEPTOR',
                useClass: logger_interceptor_1.LoggingInterceptor,
            },
            {
                provide: 'APP_INTERCEPTOR',
                useClass: api_timeout_interceptor_1.ApiTimeOutInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exceptions_filter_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map