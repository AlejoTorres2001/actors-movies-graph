import { Actor } from 'src/actors/entities/actor.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Neightbor } from './neightbor.entity';
@ObjectType()
export class Graph {
  @Field((type) => Int)
  id: number;
  @Field((type) => Actor)
  actor: Actor;
  @Field((type) => [Neightbor])
  neightbors: Neightbor[];
}
