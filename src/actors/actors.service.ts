import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateActorDto, PaginationQueryDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
  ) {}
  async create(createActorDto: CreateActorDto): Promise<Actor> {
    try {
      const newActor = this.actorsRepository.create(createActorDto);
      return await this.actorsRepository.save(newActor);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(
    { limit, offset }: PaginationQueryDto,
    name?: string,
  ): Promise<Actor[]> {
    try {
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
      if (!foundActors) {
        throw new NotFoundException(`Actors with name ${name} not found.`);
      }
      return foundActors;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Actor> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor> {
    try {
      const updatedActor = await this.actorsRepository.preload({
        id: id,
        ...updateActorDto,
      });
      if (!updatedActor) {
        throw new NotFoundException(`Actor with ID ${id} not found.`);
      }
      return await this.actorsRepository.save(updatedActor);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const foundActor = await this.actorsRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!foundActor) {
        throw new NotFoundException(`Actor with ID ${id} not found.`);
      }
      await this.actorsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
