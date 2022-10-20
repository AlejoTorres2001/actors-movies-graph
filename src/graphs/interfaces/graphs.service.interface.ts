import { ReadActorDto } from 'src/actors/dto';
import { ReadMovieDto } from 'src/movies/dto';
import { CreateGraphInput } from '../dto/create-graph.input';
import { AdjacencyListItem, Graph } from '../entities';

export interface GraphsServiceInterface {
  findPaths(createGraphInput: CreateGraphInput): Promise<Graph>;
  generateGraph(): Promise<AdjacencyListItem[]>;
  getActorMovies(actorName: string): Promise<ReadMovieDto[]>;
  getMovieActors(actorName: string): Promise<ReadActorDto[]>;
}
