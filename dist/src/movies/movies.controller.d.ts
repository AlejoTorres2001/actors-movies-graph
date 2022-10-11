import { Movie } from './entities/movies.entity';
import { createMovieDto, MoviesQueryDto, updateMovieDto } from './dto';
import { MoviesServiceInterface } from './interfaces/movies.service.interface';
export declare class MoviesController {
    private MoviesService;
    constructor(MoviesService: MoviesServiceInterface);
    getMovies(pagination: MoviesQueryDto): Promise<Movie[]>;
    getMovieById(id: number): Promise<Movie>;
    createMovie(Body: createMovieDto): Promise<Movie>;
    updateMovie(id: number, Body: updateMovieDto): Promise<Movie>;
    deleteMovie(id: number): Promise<void>;
    CreateMany(movies: createMovieDto[]): Promise<Movie[]>;
}
