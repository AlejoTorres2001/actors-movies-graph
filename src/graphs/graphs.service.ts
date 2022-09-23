import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Repository } from 'typeorm';
import { CreateGraphInput } from './dto/create-graph.input';
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
    return {
      id: 1,
      actor: this.actorRepository.findOneBy({
        name: createGraphInput.actorNameFrom,
      }),
      neighbors: [
        {
          actor: this.actorRepository.findOneBy({
            name: createGraphInput.actorNameTo,
          }),
          movies: this.movieRepository.findOneBy({
            title: 'Apollo 13',
          }),
        },
      ],
    };
  }
  private async getActorNeighbors(actorName: string) {
    const actor = await this.actorRepository.findOne({
      where: { name: actorName },
      relations: ['appearances', 'appearances.movie'],
    });
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
}
