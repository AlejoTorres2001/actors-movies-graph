import { Actor } from 'src/actors/entities/actor.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Neighbor } from './neighbor.entity';
@ObjectType()
export class Graph {
  @Field((type) => Int)
  id: number;
  @Field((type) => Actor)
  actor: Actor;
  @Field((type) => [Neighbor])
  neighbors: Neighbor[];
}
