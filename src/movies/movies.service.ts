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
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findById(id: number): Promise<Movie> {
    try {
      const foundMovie = await this.moviesRepository.findOne({
        where: {
          id: id,
        },
        relations: ['appearances'],
      });
      if (!foundMovie) {
        throw new NotFoundException(`Movie with ID ${id} not found.`);
      }
      return foundMovie;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createMovie(MovieData: createMovieDto): Promise<Movie> {
    try {
      const newMovie = this.moviesRepository.create(MovieData);
      return await this.moviesRepository.save(newMovie);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateMovie(id: number, updateData: updateMovieDto): Promise<Movie> {
    try {
      const updatedMovie: Movie = await this.moviesRepository.preload({
        id: id,
        ...updateData,
      });
      if (!updatedMovie) {
        throw new NotFoundException(`Movie with ID ${id} not found.`);
      }
      return await this.moviesRepository.save(updatedMovie);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteMovie(id: number): Promise<void> {
    try {
      const movieFound = await this.moviesRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!movieFound) {
        throw new NotFoundException(`Movie with ID ${id} not found.`);
      }
      this.moviesRepository.remove(movieFound);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
