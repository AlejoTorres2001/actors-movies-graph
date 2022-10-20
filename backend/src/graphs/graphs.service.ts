import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { ReadActorDto } from 'src/actors/dto';
import { Actor } from 'src/actors/entities/actor.entity';
import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { AppearancesRepositoryInterface } from 'src/appearances/interfaces/apperances.repository.interface';
import { ReadMovieDto } from 'src/movies/dto';
import { Movie } from 'src/movies/entities/movies.entity';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import { CreateGraphInput } from './dto/create-graph.input';
import { AdjacencyListItem } from './entities';
import { Graph } from './entities/graph.entity';
import { Neighbor } from './entities/neighbor.entity';
import { GraphsServiceInterface } from './interfaces/graphs.service.interface';
@Injectable()
export class GraphsService implements GraphsServiceInterface {
  constructor(
    @Inject('AppearancesRepositoryInterface')
    private readonly appearancesRepository: AppearancesRepositoryInterface,
    @Inject('ActorRepositoryInterface')
    private readonly actorsRepository: ActorRepositoryInterface,
    @Inject('MovieRepositoryInterface')
    private readonly moviesRepository: MoviesRepositoryInterface,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async findPaths(createGraphInput: CreateGraphInput): Promise<Graph> {
    const actorFrom = await this.findActorByName(
      createGraphInput.actorNameFrom,
    );
    const actorTo = await this.findActorByName(createGraphInput.actorNameTo);
    const pathsFound = await this.BFS(actorFrom, actorTo);
    return {
      actorFrom: actorFrom,
      actorTo: actorTo,
      paths: pathsFound,
    };
  }
  async generateGraph(): Promise<AdjacencyListItem[]> {
    const actors = await this.actorsRepository.findWithRelations({
      relations: ['appearances', 'appearances.movie'],
    });
    const adjacencyList = actors.map(async (actor) => {
      return {
        actor: actor,
        neighbors: await this.getActorNeighbors(actor.name),
      };
    });
    return await Promise.all(adjacencyList);
  }
  private async getActorNeighbors(actorName: string): Promise<Neighbor[]> {
    const actor = await this.findActorByName(actorName, [
      'appearances',
      'appearances.movie',
    ]);
    const neighborsPromiseArray = actor.appearances.map(async (appearance) => {
      const movie = appearance.movie;
      const MovieAppearances =
        await this.appearancesRepository.findWithRelations({
          where: { movie: movie },
          relations: ['actor', 'movie'],
        });
      const neighbors = MovieAppearances.filter(
        (a: Appearance) => a.actor.id !== actor.id,
      ).map((a: Appearance) => {
        return { actor: a.actor, movie: a.movie };
      });
      return neighbors;
    });
    const neighborsArray = await Promise.all(neighborsPromiseArray);
    return neighborsArray.flat();
  }
  private async BFS(actorFrom: Actor, actorTo: Actor) {
    const pathsFound = [];
    const explored = new Set();
    const queue: Neighbor[][] = [[{ actor: actorFrom, movie: null }]];
    if (actorFrom.id === actorTo.id) {
      return pathsFound;
    }
    while (queue.length > 0) {
      const path: Neighbor[] = queue.shift();
      const actor = path.slice(-1)[0].actor;
      if (!explored.has(actor.id)) {
        const neighbors = await this.getActorNeighbors(actor.name);
        for (const neighbor of neighbors) {
          const newPath = [...path, neighbor];
          if (neighbor.actor.id === actorTo.id) {
            pathsFound.push(newPath);
          } else {
            queue.push(newPath);
          }
        }
        explored.add(actor.id);
      }
    }
    return pathsFound;
  }
  private async findActorByName(
    actorName: string,
    relations: string[] = [],
  ): Promise<Actor> {
    const actor = await this.actorsRepository.findByCondition({
      where: { name: actorName },
      relations: relations,
    });
    return actor;
  }
  private async findMovieByTitle(
    movieTitle: string,
    relations: string[] = [],
  ): Promise<Movie> {
    const movie = await this.moviesRepository.findByCondition({
      where: { title: movieTitle },
      relations: relations,
    });
    return movie;
  }
  async getActorMovies(actorName: string): Promise<ReadMovieDto[]> {
    const actor = await this.findActorByName(actorName, [
      'appearances',
      'appearances.movie',
    ]);
    if (!actor) {
      return [];
    }
    return this.classMapper.mapArray(
      actor.appearances.map((a) => a.movie),
      Movie,
      ReadMovieDto,
    );
  }
  async getMovieActors(movieTitle: string): Promise<ReadActorDto[]> {
    const movie = await this.findMovieByTitle(movieTitle, [
      'appearances',
      'appearances.actor',
    ]);
    if (!movie) {
      return [];
    }
    const foundActors = movie.appearances.map((a) => a.actor);
    const array = this.classMapper.mapArray(foundActors, Actor, ReadActorDto);
    return array;
  }
}
