import { Actor } from 'src/actors/entities/actor.entity';
import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
export declare class ActorsRepository extends BaseAbstractRepository<Actor> implements ActorRepositoryInterface {
    private readonly ActorRepository;
    constructor(ActorRepository: Repository<Actor>);
}
