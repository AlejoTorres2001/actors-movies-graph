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
import { AppearanceProfile } from 'src/shared/profiles/appearance-profile';

@Module({
  imports: [TypeOrmModule.forFeature([Appearance, Actor, Movie])],
  controllers: [AppearancesController],
  providers: [
    {
      provide: 'AppearancesServiceInterface',
      useClass: AppearancesService,
    },
    {
      provide: 'AppearancesRepositoryInterface',
      useClass: AppearancesRepository,
    },
    {
      provide: 'ActorRepositoryInterface',
      useClass: ActorsRepository,
    },
    {
      provide: 'MovieRepositoryInterface',
      useClass: MoviesRepository,
    },
    AppearanceProfile,
  ],
})
export class AppearancesModule {}
