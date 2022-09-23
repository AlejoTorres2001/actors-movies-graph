import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Neighbor {
  @Field((type) => Actor)
  actor: Actor;
  @Field((type) => Movie, { nullable: true })
  movie: Movie;
}
