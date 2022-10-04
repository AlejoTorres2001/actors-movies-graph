import { ActorsQueryDto, CreateActorDto, UpdateActorDto } from '../dto';
import { Actor } from '../entities/actor.entity';

export interface ActorsServiceInterface {
  create(createActorDto: CreateActorDto): Promise<Actor>;
  findAll(actorsQueryDto: ActorsQueryDto): Promise<Actor[]>;
  findOne(id: number): Promise<Actor>;
  update(id: number, updateActorDto: UpdateActorDto): Promise<Actor>;
  remove(id: number): Promise<Actor>;
  createMany(createActorDto: CreateActorDto[]): Promise<Actor[]>;
}
