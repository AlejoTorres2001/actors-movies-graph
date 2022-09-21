import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { createMovieDto, MoviesQueryDto, updateMovieDto } from './dto';
import { Movie } from './entities/movies.entity';
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}
  async findAll({ limit, offset, title }: MoviesQueryDto): Promise<Movie[]> {
    const foundMovies = title
      ? await this.moviesRepository.find({
          where: {
            title: Like(`%${title}%`),
          },
          relations: ['appearances'],
          skip: offset,
          take: limit,
        })
      : await this.moviesRepository.find({
          relations: ['appearances'],
          skip: offset,
          take: limit,
        });
    return foundMovies;
  }
  async findById(id: number): Promise<Movie> {
    const foundMovie = await this.moviesRepository.findOne({
      where: {
        id: id,
      },
      relations: ['appearances'],
    });
    return foundMovie;
  }

  async createMovie(MovieData: createMovieDto): Promise<Movie> {
    const newMovie = this.moviesRepository.create(MovieData);
    return await this.moviesRepository.save(newMovie);
  }
  async updateMovie(id: number, updateData: updateMovieDto): Promise<Movie> {
    const updatedMovie: Movie = await this.moviesRepository.preload({
      id: id,
      ...updateData,
    });
    if (!updatedMovie) {
      return undefined;
    }
    return await this.moviesRepository.save(updatedMovie);
  }
  async deleteMovie(id: number): Promise<Movie> {
    const movieFound = await this.moviesRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!movieFound) {
      undefined;
    }
    return this.moviesRepository.remove(movieFound);
  }
}
