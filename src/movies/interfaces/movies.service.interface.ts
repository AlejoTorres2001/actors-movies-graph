import { createMovieDto, MoviesQueryDto, updateMovieDto } from '../dto';
import { Movie } from '../entities/movies.entity';

export interface MoviesServiceInterface {
  create(createActorDto: createMovieDto): Promise<Movie>;
  findAll(actorsQueryDto: MoviesQueryDto): Promise<Movie[]>;
  findOne(id: number): Promise<Movie>;
  update(id: number, updateActorDto: updateMovieDto): Promise<Movie>;
  remove(id: number): Promise<Movie>;
  createMany(createActorDto: createMovieDto[]): Promise<Movie[]>;
}
