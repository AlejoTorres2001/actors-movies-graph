import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
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

  async findAll(name?: string): Promise<Actor[]> {
    const foundActors = name
      ? await this.actorsRepository.find({
          where: { name: name },
          relations: ['appearances'],
        })
      : await this.actorsRepository.find({
          relations: ['appearances'],
        });
    if (!foundActors) {
      throw new NotFoundException(`Actors with name ${name} not found.`);
    }
    return foundActors;
  }

  async findOne(id: number): Promise<Actor> {
    const foundActor = await this.actorsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['appearances'],
    });
    if (!foundActor) {
      throw new NotFoundException(`Actor with ID ${id} not found.`);
    }
    return foundActor;
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    const updatedActor = await this.actorsRepository.preload({
      id: id,
      ...updateActorDto,
    });
    if (!updatedActor) {
      throw new NotFoundException(`Actor with ID ${id} not found.`);
    }
    return await this.actorsRepository.save(updatedActor);
  }

  async remove(id: number): Promise<void> {
    const foundActor = await this.actorsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundActor) {
      throw new NotFoundException(`Actor with ID ${id} not found.`);
    }
    await this.actorsRepository.delete(id);
  }
}
