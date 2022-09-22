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
  GenerateGraph(createGraphInput: CreateGraphInput) {
    return `This action returns a #${createGraphInput} graph`;
  }
  FindActorNeighbors(actorName: string) {
    return `This action returns a #${actorName} actor`;
  }
}
