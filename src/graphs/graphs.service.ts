import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Repository } from 'typeorm';
import { CreateGraphInput } from './dto/create-graph.input';
import { AdjacencyList } from './entities';
import { Graph } from './entities/graph.entity';
import { Neighbor } from './entities/neighbor.entity';
@Injectable()
export class GraphsService {
  constructor(
    @InjectRepository(Appearance)
    private readonly appearanceRepository: Repository<Appearance>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}
  async FindPaths(createGraphInput: CreateGraphInput): Promise<Graph> {
    const actorFrom = await this.findActorByName(
      createGraphInput.actorNameFrom,
    );
    const actorTo = await this.findActorByName(createGraphInput.actorNameTo);
    const pathsFound = await this.BFS(actorFrom, actorTo);
    return {
      id: 1,
      actorFrom: actorFrom,
      actorTo: actorTo,
      paths: pathsFound,
    };
  }
  async GenerateGraph(): Promise<AdjacencyList[]> {
    const actors = await this.actorRepository.find({
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
      //if (pathsFound.length >= 2) return pathsFound; // !too expensive to traverse entire graph, need indexes to speed up
      const path: Neighbor[] = queue.shift();
      const actor = path.slice(-1)[0].actor;
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
  private async findActorByName(
    actorName: string,
    relations: string[] = [],
  ): Promise<Actor> {
    const actor = await this.actorRepository.findOne({
      where: { name: actorName },
      relations: relations,
    });
    return actor;
  }
}
