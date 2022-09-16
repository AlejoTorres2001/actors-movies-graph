import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'appearances',
})
export class Appearance {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Actor, (actor) => actor.appearances, { onDelete: 'CASCADE' })
  actor: Actor;
  @ManyToOne(() => Movie, (movie) => movie.appearances, { onDelete: 'CASCADE' })
  movie: Movie;
}
