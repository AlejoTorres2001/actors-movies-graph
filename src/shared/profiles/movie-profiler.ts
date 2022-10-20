import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createMovieDto, ReadMovieDto, updateMovieDto } from 'src/movies/dto';
import { Movie } from 'src/movies/entities/movies.entity';

@Injectable()
export class MovieProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Movie, ReadMovieDto);
      createMap(
        mapper,
        createMovieDto,
        Movie,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, updateMovieDto, Movie);
    };
  }
}
