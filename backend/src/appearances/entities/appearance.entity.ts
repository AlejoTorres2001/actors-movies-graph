import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
@ObjectType()
@Entity({
  name: 'appearances',
})
export class Appearance {
  @Field((type) => Int)
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  @AutoMap()
  id: number;
  @Field((type) => Actor)
  @ManyToOne(() => Actor, (actor) => actor.appearances, { cascade: true })
  @JoinColumn({ name: 'actor_id' })
  @ApiProperty({ type: () => Actor })
  @AutoMap(() => Actor)
  actor: Actor;
  @Field((type) => Movie)
  @ManyToOne(() => Movie, (movie) => movie.appearances, { cascade: true })
  @JoinColumn({ name: 'movie_id' })
  @ApiProperty({ type: () => Movie })
  @AutoMap(() => Movie)
  movie: Movie;
}
