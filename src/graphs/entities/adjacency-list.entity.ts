import { Actor } from 'src/actors/entities/actor.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Neighbor } from './neighbor.entity';
@ObjectType()
export class AdjacencyList {
  @Field((type) => Actor)
  actor: Actor;
  @Field((type) => [Neighbor])
  neighbors: Neighbor[];
}
