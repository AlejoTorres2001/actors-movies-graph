import { Actor } from 'src/actors/entities/actor.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Neighbor } from './neighbor.entity';
@ObjectType()
export class Graph {
  @Field((type) => Actor)
  actorFrom: Actor;
  @Field((type) => Actor)
  actorTo: Actor;
  @Field((type) => [[Neighbor]])
  paths: Neighbor[][];
}
