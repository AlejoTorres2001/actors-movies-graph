import { Actor } from 'src/actors/entities/actor.entity';
import { Neighbor } from './neighbor.entity';
export declare class Graph {
    actorFrom: Actor;
    actorTo: Actor;
    paths: Neighbor[][];
}
