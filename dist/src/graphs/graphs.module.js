"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphsModule = void 0;
const common_1 = require("@nestjs/common");
const graphs_service_1 = require("./graphs.service");
const graphs_resolver_1 = require("./graphs.resolver");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const appearance_entity_1 = require("../appearances/entities/appearance.entity");
const actor_entity_1 = require("../actors/entities/actor.entity");
const movies_entity_1 = require("../movies/entities/movies.entity");
const appearances_repository_1 = require("../shared/repositories/appearances.repository");
const actors_repository_1 = require("../shared/repositories/actors.repository");
const movies_repository_1 = require("../shared/repositories/movies.repository");
let GraphsModule = class GraphsModule {
};
GraphsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), './src/graphs/schema.gql'),
                sortSchema: true,
                playground: true,
                introspection: true,
                context: ({ req, res }) => ({ req, res }),
                formatError: (error) => {
                    var _a;
                    const graphQLFormattedError = {
                        message: error.message,
                        path: error.path,
                        extensions: {
                            code: (_a = error.extensions) === null || _a === void 0 ? void 0 : _a.code,
                        },
                    };
                    return graphQLFormattedError;
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([appearance_entity_1.Appearance, actor_entity_1.Actor, movies_entity_1.Movie]),
        ],
        providers: [
            graphs_resolver_1.GraphsResolver,
            {
                provide: 'GraphsServiceInterface',
                useClass: graphs_service_1.GraphsService,
            },
            {
                provide: 'AppearancesRepositoryInterface',
                useClass: appearances_repository_1.AppearancesRepository,
            },
            {
                provide: 'ActorRepositoryInterface',
                useClass: actors_repository_1.ActorsRepository,
            },
            {
                provide: 'MovieRepositoryInterface',
                useClass: movies_repository_1.MoviesRepository,
            },
        ],
    })
], GraphsModule);
exports.GraphsModule = GraphsModule;
//# sourceMappingURL=graphs.module.js.map