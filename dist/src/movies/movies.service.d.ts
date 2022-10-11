import { createMovieDto, MoviesQueryDto, updateMovieDto } from './dto';
import { Movie } from './entities/movies.entity';
import { MoviesRepositoryInterface } from './interfaces/movies.repository.interface';
import { MoviesServiceInterface } from './interfaces/movies.service.interface';
export declare class MoviesService implements MoviesServiceInterface {
    private readonly moviesRepository;
    constructor(moviesRepository: MoviesRepositoryInterface);
    findAll({ limit, offset, title }: MoviesQueryDto): Promise<Movie[]>;
    findOne(id: number): Promise<Movie>;
    create(MovieData: createMovieDto): Promise<Movie>;
    update(id: number, updateData: updateMovieDto): Promise<Movie>;
    remove(id: number): Promise<Movie>;
    createMany(movies: createMovieDto[]): Promise<Movie[]>;
}
