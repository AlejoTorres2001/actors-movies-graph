import { ActorsQueryDto, CreateActorDto, ReadActorDto, UpdateActorDto } from '../dto';
export interface ActorsServiceInterface {
    create(createActorDto: CreateActorDto): Promise<ReadActorDto>;
    findAll(actorsQueryDto: ActorsQueryDto): Promise<ReadActorDto[]>;
    findOne(id: number): Promise<ReadActorDto>;
    update(id: number, updateActorDto: UpdateActorDto): Promise<ReadActorDto>;
    remove(id: number): Promise<ReadActorDto>;
    createMany(createActorDto: CreateActorDto[]): Promise<ReadActorDto[]>;
}
