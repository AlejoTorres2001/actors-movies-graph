import { BaseInterfaceRepository } from 'src/shared/repositories/base/base.interface.repository';
import { Movie } from '../entities/movies.entity';

export interface MoviesRepositoryInterface
  extends BaseInterfaceRepository<Movie> {}
