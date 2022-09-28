import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ActorsQueryDto, CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}
  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const newActor = this.actorsRepository.create(createActorDto);
    return await this.actorsRepository.save(newActor);
  }

  async findAll({ limit, offset, name }: ActorsQueryDto): Promise<Actor[]> {
    const foundActors = name
      ? await this.actorsRepository.find({
          where: { name: Like(`%${name}%`) },
          relations: ['appearances'],
          skip: offset,
          take: limit,
          order: {
            id: 'ASC',
          },
        })
      : await this.actorsRepository.find({
          relations: ['appearances'],
          skip: offset,
          take: limit,
        });
    return foundActors;
  }

  async findOne(id: number): Promise<Actor> {
    const foundActor = await this.actorsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['appearances'],
    });
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
    const foundActor = await this.actorsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundActor) {
      return undefined;
    }
    return await this.actorsRepository.remove(foundActor);
  }
  async createMany(actors: CreateActorDto[]): Promise<Actor[]> {
    const newActors = this.actorsRepository.create(actors);
    return await this.actorsRepository.save(newActors);
  }
}
