import { Inject, Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { ActorsQueryDto, CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';
import { ActorRepositoryInterface } from './interfaces/actors.repository.interface';
import { ActorsServiceInterface } from './interfaces/actors.service.interface';

@Injectable()
export class ActorsService implements ActorsServiceInterface {
  constructor(
    @Inject('ActorRepositoryInterface')
    private readonly actorsRepository: ActorRepositoryInterface,
  ) {}
  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const newActor = this.actorsRepository.create(createActorDto);
    return await this.actorsRepository.save(newActor);
  }

  async findAll({ limit, offset, name }: ActorsQueryDto): Promise<Actor[]> {
    const foundActors = name
      ? await this.actorsRepository.findAll({
          where: { name: Like(`%${name}%`) },
          skip: offset,
          take: limit,
          order: {
            id: 'ASC',
          },
        })
      : await this.actorsRepository.findAll({
          skip: offset,
          take: limit,
        });
    return foundActors;
  }

  async findOne(id: number): Promise<Actor> {
    const foundActor = await this.actorsRepository.findOneById(id);
    return foundActor;
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    const updatedActor = await this.actorsRepository.preload({
      id: id,
      ...updateActorDto,
    });
    if (!updatedActor) {
      return undefined;
    }
    return await this.actorsRepository.save(updatedActor);
  }

  async remove(id: number): Promise<Actor> {
    const foundActor = await this.actorsRepository.findOneById(id);
    if (!foundActor) {
      return undefined;
    }
    return await this.actorsRepository.remove(foundActor);
  }
  async createMany(actors: CreateActorDto[]): Promise<Actor[]> {
    const newActors = this.actorsRepository.createMany(actors);
    return await this.actorsRepository.SaveMany(newActors);
  }
}
