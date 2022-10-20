import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieProfile } from 'src/shared/profiles/movie-profiler';
import { MoviesRepository } from 'src/shared/repositories/movies.repository';
import { Movie } from './entities/movies.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [
    {
      provide: 'MovieRepositoryInterface',
      useClass: MoviesRepository,
    },
    {
      provide: 'MovieServiceInterface',
      useClass: MoviesService,
    },
    MovieProfile,
  ],
})
export class MoviesModule {}
