import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Repository } from 'typeorm';
import { CreateGraphInput } from './dto/create-graph.input';
import { Neighbor } from './entities/neighbor.entity';
@Injectable()
export class GraphsService {
  constructor(
    @InjectRepository(Appearance)
    private readonly appearanceRepository: Repository<Appearance>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async GenerateGraph(createGraphInput: CreateGraphInput) {
    const actorFrom = await this.findActorByName(
      createGraphInput.actorNameFrom,
    );
    const actorTo = await this.findActorByName(createGraphInput.actorNameTo);
    const pathsFound = await this.BFS(actorFrom, actorTo);
    return {
      id: 1,
      actor: actorFrom,
      paths: pathsFound,
    };
  }
  private async getActorNeighbors(actorName: string) {
    const actor = await this.findActorByName(actorName, [
      'appearances',
      'appearances.movie',
    ]);
    const neighborsPromiseArray = actor.appearances.map(async (appearance) => {
      const movie = appearance.movie;
      const MovieAppearances = await this.appearanceRepository.find({
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
      const actor = path[0].actor;
      if (!explored.has(actor)) {
        const neighbors = await this.getActorNeighbors(actor.name);
        for (const neighbor of neighbors) {
          const newPath = [...path, neighbor];
          queue.push(newPath);
          if (neighbor.actor.id === actorTo.id) {
            pathsFound.push(newPath);
          }
        }
        explored.add(actor);
      }
    }
    return pathsFound;
  }
  private async findActorByName(actorName: string, relations: string[] = []) {
    const actor = await this.actorRepository.findOne({
      where: { name: actorName },
      relations: relations,
    });
    return actor;
  }
}
