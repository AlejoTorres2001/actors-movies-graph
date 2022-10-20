import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
export declare class Appearance {
    id: number;
    actor: Actor;
    movie: Movie;
}
