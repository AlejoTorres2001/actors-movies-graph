import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import {
  createMovieDto,
  MoviesQueryDto,
  ReadMovieDto,
  updateMovieDto,
} from './dto';
import { Movie } from './entities/movies.entity';
import { MoviesRepositoryInterface } from './interfaces/movies.repository.interface';
import { MoviesServiceInterface } from './interfaces/movies.service.interface';
@Injectable()
export class MoviesService implements MoviesServiceInterface {
  constructor(
    @Inject('MovieRepositoryInterface')
    private readonly moviesRepository: MoviesRepositoryInterface,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async findAll({
    limit,
    offset,
    title,
  }: MoviesQueryDto): Promise<ReadMovieDto[]> {
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
    return this.classMapper.mapArray(foundMovies, Movie, ReadMovieDto);
  }
  async findOne(id: number): Promise<ReadMovieDto> {
    const foundMovie = await this.moviesRepository.findOneById(id);
    return this.classMapper.map(foundMovie, Movie, ReadMovieDto);
  }

  async create(MovieData: createMovieDto): Promise<ReadMovieDto> {
    const newMovie = this.moviesRepository.create(MovieData);
    return this.classMapper.map(
      await this.moviesRepository.save(newMovie),
      Movie,
      ReadMovieDto,
    );
  }
  async update(id: number, updateData: updateMovieDto): Promise<ReadMovieDto> {
    const updatedMovie: Movie = await this.moviesRepository.preload({
      id: id,
      ...updateData,
    });
    if (!updatedMovie) {
      return undefined;
    }
    return this.classMapper.map(
      await this.moviesRepository.save(updatedMovie),
      Movie,
      ReadMovieDto,
    );
  }
  async remove(id: number): Promise<ReadMovieDto> {
    const movieFound = await this.moviesRepository.findOneById(id);
    if (!movieFound) {
      undefined;
    }
    return this.classMapper.map(
      await this.moviesRepository.remove(movieFound),
      Movie,
      ReadMovieDto,
    );
  }
  async createMany(movies: createMovieDto[]): Promise<ReadMovieDto[]> {
    const newMovies = this.moviesRepository.createMany(movies);
    return this.classMapper.mapArray(
      await this.moviesRepository.saveMany(newMovies),
      Movie,
      ReadMovieDto,
    );
  }
}
