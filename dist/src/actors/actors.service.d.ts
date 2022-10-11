import { ActorsQueryDto, CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';
import { ActorRepositoryInterface } from './interfaces/actors.repository.interface';
import { ActorsServiceInterface } from './interfaces/actors.service.interface';
export declare class ActorsService implements ActorsServiceInterface {
    private readonly actorsRepository;
    constructor(actorsRepository: ActorRepositoryInterface);
    create(createActorDto: CreateActorDto): Promise<Actor>;
    findAll({ limit, offset, name }: ActorsQueryDto): Promise<Actor[]>;
    findOne(id: number): Promise<Actor>;
    update(id: number, updateActorDto: UpdateActorDto): Promise<Actor>;
    remove(id: number): Promise<Actor>;
    createMany(actors: CreateActorDto[]): Promise<Actor[]>;
}
