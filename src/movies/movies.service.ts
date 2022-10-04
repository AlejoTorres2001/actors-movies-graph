import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepository } from 'src/shared/repositories/movies.repository';
import { Like, Repository } from 'typeorm';
import { createMovieDto, MoviesQueryDto, updateMovieDto } from './dto';
import { Movie } from './entities/movies.entity';
import { MoviesRepositoryInterface } from './interfaces/movies.repository.interface';
import { MoviesServiceInterface } from './interfaces/movies.service.interface';
@Injectable()
export class MoviesService implements MoviesServiceInterface {
  constructor(
    @Inject('MovieRepositoryInterface')
    private readonly moviesRepository: MoviesRepositoryInterface,
  ) {}
  async findAll({ limit, offset, title }: MoviesQueryDto): Promise<Movie[]> {
    const foundMovies = title
      ? await this.moviesRepository.findAll({
          where: {
            title: Like(`%${title}%`),
          },
          skip: offset,
          take: limit,
        })
      : await this.moviesRepository.findAll({
          skip: offset,
          take: limit,
        });
    return foundMovies;
  }
  async findOne(id: number): Promise<Movie> {
    const foundMovie = await this.moviesRepository.findOneById(id);
    return foundMovie;
  }

  async create(MovieData: createMovieDto): Promise<Movie> {
    const newMovie = this.moviesRepository.create(MovieData);
    return await this.moviesRepository.save(newMovie);
  }
  async update(id: number, updateData: updateMovieDto): Promise<Movie> {
    const updatedMovie: Movie = await this.moviesRepository.preload({
      id: id,
      ...updateData,
    });
    if (!updatedMovie) {
      return undefined;
    }
    return await this.moviesRepository.save(updatedMovie);
  }
  async remove(id: number): Promise<Movie> {
    const movieFound = await this.moviesRepository.findOneById(id);
    if (!movieFound) {
      undefined;
    }
    return this.moviesRepository.remove(movieFound);
  }
  async createMany(movies: createMovieDto[]): Promise<Movie[]> {
    const newMovies = this.moviesRepository.createMany(movies);
    return await this.moviesRepository.saveMany(newMovies);
  }
}
