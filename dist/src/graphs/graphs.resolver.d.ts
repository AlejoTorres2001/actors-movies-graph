import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { AdjacencyListItem, Graph } from './entities';
import { GraphsServiceInterface } from './interfaces/graphs.service.interface';
export declare class GraphsResolver {
    private readonly graphsService;
    constructor(graphsService: GraphsServiceInterface);
    findPaths(actorNameFrom: string, actorNameTo: string): Promise<Graph>;
    generateGraph(): Promise<AdjacencyListItem[]>;
    getActorMovies(actorName: string): Promise<Movie[]>;
    getMovieActors(movieTitle: string): Promise<Actor[]>;
}
