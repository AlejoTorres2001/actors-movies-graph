import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movies.entity';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class MoviesRepository
  extends BaseAbstractRepository<Movie>
  implements MoviesRepositoryInterface
{
  constructor(
    @InjectRepository(Movie)
    private readonly MoviesRepository: Repository<Movie>,
  ) {
    super(MoviesRepository);
  }
}
