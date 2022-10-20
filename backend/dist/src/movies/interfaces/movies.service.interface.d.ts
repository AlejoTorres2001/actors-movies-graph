import { createMovieDto, MoviesQueryDto, ReadMovieDto, updateMovieDto } from '../dto';
export interface MoviesServiceInterface {
    create(createActorDto: createMovieDto): Promise<ReadMovieDto>;
    findAll(actorsQueryDto: MoviesQueryDto): Promise<ReadMovieDto[]>;
    findOne(id: number): Promise<ReadMovieDto>;
    update(id: number, updateActorDto: updateMovieDto): Promise<ReadMovieDto>;
    remove(id: number): Promise<ReadMovieDto>;
    createMany(createActorDto: createMovieDto[]): Promise<ReadMovieDto[]>;
}
