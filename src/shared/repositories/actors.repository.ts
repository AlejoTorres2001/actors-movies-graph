import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class ActorsRepository
  extends BaseAbstractRepository<Actor>
  implements ActorRepositoryInterface
{
  constructor(
    @InjectRepository(Actor)
    private readonly ActorRepository: Repository<Actor>,
  ) {
    super(ActorRepository);
  }
}
