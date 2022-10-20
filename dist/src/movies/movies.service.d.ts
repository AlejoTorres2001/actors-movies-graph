import { Mapper } from '@automapper/core';
import { createMovieDto, MoviesQueryDto, ReadMovieDto, updateMovieDto } from './dto';
import { MoviesRepositoryInterface } from './interfaces/movies.repository.interface';
import { MoviesServiceInterface } from './interfaces/movies.service.interface';
export declare class MoviesService implements MoviesServiceInterface {
    private readonly moviesRepository;
    private readonly classMapper;
    constructor(moviesRepository: MoviesRepositoryInterface, classMapper: Mapper);
    findAll({ limit, offset, title, }: MoviesQueryDto): Promise<ReadMovieDto[]>;
    findOne(id: number): Promise<ReadMovieDto>;
    create(MovieData: createMovieDto): Promise<ReadMovieDto>;
    update(id: number, updateData: updateMovieDto): Promise<ReadMovieDto>;
    remove(id: number): Promise<ReadMovieDto>;
    createMany(movies: createMovieDto[]): Promise<ReadMovieDto[]>;
}
