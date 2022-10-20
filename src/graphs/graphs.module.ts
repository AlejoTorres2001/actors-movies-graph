import { Module } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { GraphsResolver } from './graphs.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AppearancesRepository } from 'src/shared/repositories/appearances.repository';
import { ActorsRepository } from 'src/shared/repositories/actors.repository';
import { MoviesRepository } from 'src/shared/repositories/movies.repository';
import { ActorProfile } from 'src/shared/profiles/actor-profile';
import { MovieProfile } from 'src/shared/profiles/movie-profiler';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/graphs/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          path: error.path,
          extensions: {
            code: error.extensions?.code,
          },
        };
        return graphQLFormattedError;
      },
    }),
    TypeOrmModule.forFeature([Appearance, Actor, Movie]),
  ],
  providers: [
    GraphsResolver,
    {
      provide: 'GraphsServiceInterface',
      useClass: GraphsService,
    },
    {
      provide: 'AppearancesRepositoryInterface',
      useClass: AppearancesRepository,
    },
    {
      provide: 'ActorRepositoryInterface',
      useClass: ActorsRepository,
    },
    {
      provide: 'MovieRepositoryInterface',
      useClass: MoviesRepository,
    },
    ActorProfile,
    MovieProfile,
  ],
})
export class GraphsModule {}
