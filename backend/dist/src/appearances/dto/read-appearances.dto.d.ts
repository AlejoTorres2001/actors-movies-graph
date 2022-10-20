import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
export declare class ReadAppearanceDto {
    id: number;
    actor: Actor;
    movie: Movie;
}
