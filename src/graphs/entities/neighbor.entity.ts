import { Field, ObjectType } from '@nestjs/graphql';
import { ReadActorDto } from 'src/actors/dto';
import { ReadMovieDto } from 'src/movies/dto';
@ObjectType()
export class Neighbor {
  @Field((type) => ReadActorDto)
  actor: ReadActorDto;
  @Field((type) => ReadMovieDto, { nullable: true })
  movie: ReadMovieDto;
}
