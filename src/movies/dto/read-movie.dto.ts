import { Appearance } from 'src/appearances/entities/appearance.entity';
import { AutoMap } from '@automapper/classes';

export class ReadMovieDto {
  @AutoMap()
  id: number;
  @AutoMap()
  title: string;
  @AutoMap()
  year: number;
  @AutoMap(() => Appearance)
  appearances: Appearance[];
}
