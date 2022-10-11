import { Movie } from 'src/movies/entities/movies.entity';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
export declare class MoviesRepository extends BaseAbstractRepository<Movie> implements MoviesRepositoryInterface {
    private readonly MoviesRepository;
    constructor(MoviesRepository: Repository<Movie>);
}
