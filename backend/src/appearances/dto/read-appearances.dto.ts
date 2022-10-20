import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
export class ReadAppearanceDto {
  @ApiProperty()
  @AutoMap()
  id: number;
  @ApiProperty({ type: () => Actor })
  @AutoMap(() => Actor)
  actor: Actor;
  @ApiProperty({ type: () => Movie })
  @AutoMap(() => Movie)
  movie: Movie;
}
