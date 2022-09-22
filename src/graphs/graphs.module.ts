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
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './src/graphs/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forFeature([Appearance, Actor, Movie]),
  ],
  providers: [GraphsResolver, GraphsService],
})
export class GraphsModule {}
