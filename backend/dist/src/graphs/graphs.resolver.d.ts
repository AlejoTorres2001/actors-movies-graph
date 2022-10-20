import { ReadActorDto } from 'src/actors/dto';
import { ReadMovieDto } from 'src/movies/dto';
import { AdjacencyListItem, Graph } from './entities';
import { GraphsServiceInterface } from './interfaces/graphs.service.interface';
export declare class GraphsResolver {
    private readonly graphsService;
    constructor(graphsService: GraphsServiceInterface);
    findPaths(actorNameFrom: string, actorNameTo: string): Promise<Graph>;
    generateGraph(): Promise<AdjacencyListItem[]>;
    getActorMovies(actorName: string): Promise<ReadMovieDto[]>;
    getMovieActors(movieTitle: string): Promise<ReadActorDto[]>;
}
