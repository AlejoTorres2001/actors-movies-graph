import { createMovieDto, MoviesQueryDto, ReadMovieDto, updateMovieDto } from './dto';
import { MoviesServiceInterface } from './interfaces/movies.service.interface';
export declare class MoviesController {
    private MoviesService;
    constructor(MoviesService: MoviesServiceInterface);
    getMovies(pagination: MoviesQueryDto): Promise<ReadMovieDto[]>;
    getMovieById(id: number): Promise<ReadMovieDto>;
    createMovie(Body: createMovieDto): Promise<ReadMovieDto>;
    updateMovie(id: number, Body: updateMovieDto): Promise<ReadMovieDto>;
    deleteMovie(id: number): Promise<void>;
    CreateMany(movies: createMovieDto[]): Promise<ReadMovieDto[]>;
}
