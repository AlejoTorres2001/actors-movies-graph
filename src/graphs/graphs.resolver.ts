import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { AdjacencyListItem, Graph } from './entities';
import { GraphsServiceInterface } from './interfaces/graphs.service.interface';
@Resolver((of) => Graph)
export class GraphsResolver {
  constructor(
    @Inject('GraphsServiceInterface')
    private readonly graphsService: GraphsServiceInterface,
  ) {}

  @Query((returns) => Graph)
  async findPaths(
    @Args('actorNameFrom') actorNameFrom: string,
    @Args('actorNameTo') actorNameTo: string,
  ) {
    try {
      return await this.graphsService.findPaths({
        actorNameFrom,
        actorNameTo,
      });
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
  @Query((returns) => [AdjacencyListItem])
  async generateGraph() {
    try {
      return await this.graphsService.generateGraph();
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
  @Query((returns) => [Movie])
  async getActorMovies(@Args('actorName') actorName: string) {
    let movies: Movie[];
    try {
      movies = await this.graphsService.getActorMovies(actorName);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
    if (movies.length === 0) {
      throw new GraphQLError('Actor not found');
    }
    return movies;
  }
  @Query((returns) => [Actor])
  async getMovieActors(@Args('movieTitle') movieTitle: string) {
    let actors: Actor[];
    try {
      actors = await this.graphsService.getMovieActors(movieTitle);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
    if (actors.length === 0) {
      throw new GraphQLError('Movie not found');
    }
    return actors;
  }
}
