import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Neightbor {
  @Field((type) => Actor)
  actor: Actor;
  @Field((type) => Movie)
  movie: Movie;
}
