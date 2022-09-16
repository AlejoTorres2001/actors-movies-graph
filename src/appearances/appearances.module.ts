import { Module } from '@nestjs/common';
import { AppearancesService } from './appearances.service';
import { AppearancesController } from './appearances.controller';
import { Appearance } from './entities/appearance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appearance, Actor, Movie])],
  controllers: [AppearancesController],
  providers: [AppearancesService],
})
export class AppearancesModule {}
