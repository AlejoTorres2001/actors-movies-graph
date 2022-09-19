import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'appearances',
})
export class Appearance {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Actor, (actor) => actor.appearances, { cascade: true })
  @JoinColumn({ name: 'actor_id' })
  actor: Actor;
  @ManyToOne(() => Movie, (movie) => movie.appearances, { cascade: true })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}
