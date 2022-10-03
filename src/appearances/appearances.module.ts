import { Module } from '@nestjs/common';
import { AppearancesController } from './appearances.controller';
import { Appearance } from './entities/appearance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { AppearancesRepository } from 'src/shared/repositories/appearances.repository';
import { AppearancesService } from './appearances.service';
import { ActorsRepository } from 'src/shared/repositories/actors.repository';
import { MoviesRepository } from 'src/shared/repositories/movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Appearance, Actor, Movie])],
  controllers: [AppearancesController],
  providers: [
    {
      provide: 'AppearancesRepositoryInterface',
      useClass: AppearancesRepository,
    },
    {
      provide: 'AppearancesServiceInterface',
      useClass: AppearancesService,
    },
    {
      provide: 'ActorRepositoryInterface',
      useClass: ActorsRepository,
    },
    {
      provide: 'MovieRepositoryInterface',
      useClass: MoviesRepository,
    },
  ],
})
export class AppearancesModule {}
