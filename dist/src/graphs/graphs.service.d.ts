import { Actor } from 'src/actors/entities/actor.entity';
import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { AppearancesRepositoryInterface } from 'src/appearances/interfaces/apperances.repository.interface';
import { Movie } from 'src/movies/entities/movies.entity';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import { CreateGraphInput } from './dto/create-graph.input';
import { AdjacencyListItem } from './entities';
import { Graph } from './entities/graph.entity';
import { GraphsServiceInterface } from './interfaces/graphs.service.interface';
export declare class GraphsService implements GraphsServiceInterface {
    private readonly appearancesRepository;
    private readonly actorsRepository;
    private readonly moviesRepository;
    constructor(appearancesRepository: AppearancesRepositoryInterface, actorsRepository: ActorRepositoryInterface, moviesRepository: MoviesRepositoryInterface);
    findPaths(createGraphInput: CreateGraphInput): Promise<Graph>;
    generateGraph(): Promise<AdjacencyListItem[]>;
    private getActorNeighbors;
    private BFS;
    private findActorByName;
    private findMovieByTitle;
    getActorMovies(actorName: string): Promise<Movie[]>;
    getMovieActors(movieTitle: string): Promise<Actor[]>;
}
