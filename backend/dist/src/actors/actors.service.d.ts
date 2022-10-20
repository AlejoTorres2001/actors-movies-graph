import { Mapper } from '@automapper/core';
import { ActorsQueryDto, CreateActorDto, ReadActorDto, UpdateActorDto } from './dto';
import { ActorRepositoryInterface } from './interfaces/actors.repository.interface';
import { ActorsServiceInterface } from './interfaces/actors.service.interface';
export declare class ActorsService implements ActorsServiceInterface {
    private readonly actorsRepository;
    private readonly classMapper;
    constructor(actorsRepository: ActorRepositoryInterface, classMapper: Mapper);
    create(createActorDto: CreateActorDto): Promise<ReadActorDto>;
    findAll({ limit, offset, name, }: ActorsQueryDto): Promise<ReadActorDto[]>;
    findOne(id: number): Promise<ReadActorDto>;
    update(id: number, updateActorDto: UpdateActorDto): Promise<ReadActorDto>;
    remove(id: number): Promise<ReadActorDto>;
    createMany(actors: CreateActorDto[]): Promise<ReadActorDto[]>;
}
