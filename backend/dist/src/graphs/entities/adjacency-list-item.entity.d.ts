import { Neighbor } from './neighbor.entity';
import { ReadActorDto } from 'src/actors/dto';
export declare class AdjacencyListItem {
    actor: ReadActorDto;
    neighbors: Neighbor[];
}
