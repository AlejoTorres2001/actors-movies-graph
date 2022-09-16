import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-movie.dto';
import { updateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}
  async findAll(title?: string): Promise<Movie[]> {
    if (title) {
      return await this.moviesRepository.find({
        where: {
          title: title,
        },
      });
    }
    return await this.moviesRepository.find();
  }
  async findById(id: number): Promise<Movie> {
    const foundMovie = await this.moviesRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return foundMovie;
  }

  async createMovie(MovieData: createMovieDto): Promise<Movie> {
    const newMovie = this.moviesRepository.create(MovieData);
    return await this.moviesRepository.save(newMovie);
  }
  async findByTitle(title: string): Promise<Movie> {
    const movieFound = await this.moviesRepository.findOne({
      where: { title: title },
    });
    if (!movieFound) {
      throw new NotFoundException(`Movie with title ${title} not found.`);
    }
    return movieFound;
  }
  async updateMovie(id: number, updateData: updateMovieDto): Promise<Movie> {
    const updatedMovie: Movie = await this.moviesRepository.preload({
      id: id,
      ...updateData,
    });
    if (!updatedMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return await this.moviesRepository.save(updatedMovie);
  }
  async deleteMovie(id: number): Promise<void> {
    const movieFound = await this.moviesRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!movieFound) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    this.moviesRepository.remove(movieFound);
  }
}
