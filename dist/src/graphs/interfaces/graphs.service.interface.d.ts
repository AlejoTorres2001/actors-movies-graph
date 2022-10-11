import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { CreateGraphInput } from '../dto/create-graph.input';
import { AdjacencyListItem, Graph } from '../entities';
export interface GraphsServiceInterface {
    findPaths(createGraphInput: CreateGraphInput): Promise<Graph>;
    generateGraph(): Promise<AdjacencyListItem[]>;
    getActorMovies(actorName: string): Promise<Movie[]>;
    getMovieActors(actorName: string): Promise<Actor[]>;
}
