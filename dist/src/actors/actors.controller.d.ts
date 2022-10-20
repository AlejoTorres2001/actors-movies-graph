import { ActorsQueryDto, CreateActorDto, ReadActorDto, UpdateActorDto } from './dto';
import { ActorsServiceInterface } from './interfaces/actors.service.interface';
export declare class ActorsController {
    private readonly actorsService;
    constructor(actorsService: ActorsServiceInterface);
    create(createActorDto: CreateActorDto): Promise<ReadActorDto>;
    findAll(pagination: ActorsQueryDto): Promise<ReadActorDto[]>;
    findOne(id: number): Promise<ReadActorDto>;
    update(id: number, updateActorDto: UpdateActorDto): Promise<ReadActorDto>;
    remove(id: number): Promise<void>;
    createMany(actors: CreateActorDto[]): Promise<ReadActorDto[]>;
}
