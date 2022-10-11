import { Actor } from 'src/actors/entities/actor.entity';
import { Neighbor } from './neighbor.entity';
export declare class Graph {
    id: number;
    actorFrom: Actor;
    actorTo: Actor;
    paths: Neighbor[][];
}
