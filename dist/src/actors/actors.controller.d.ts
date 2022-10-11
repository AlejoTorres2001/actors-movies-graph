import { ActorsQueryDto, CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';
import { ActorsServiceInterface } from './interfaces/actors.service.interface';
export declare class ActorsController {
    private readonly actorsService;
    constructor(actorsService: ActorsServiceInterface);
    create(createActorDto: CreateActorDto): Promise<Actor>;
    findAll(pagination: ActorsQueryDto): Promise<Actor[]>;
    findOne(id: number): Promise<Actor>;
    update(id: number, updateActorDto: UpdateActorDto): Promise<Actor>;
    remove(id: number): Promise<void>;
    createMany(actors: CreateActorDto[]): Promise<Actor[]>;
}
