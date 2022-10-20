import { Field, ObjectType } from '@nestjs/graphql';
import { Neighbor } from './neighbor.entity';
import { ReadActorDto } from 'src/actors/dto';
@ObjectType()
export class AdjacencyListItem {
  @Field((type) => ReadActorDto)
  actor: ReadActorDto;
  @Field((type) => [Neighbor])
  neighbors: Neighbor[];
}
