import { Appearance } from 'src/appearances/entities/appearance.entity';
import { AppearancesRepositoryInterface } from 'src/appearances/interfaces/apperances.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
export declare class AppearancesRepository extends BaseAbstractRepository<Appearance> implements AppearancesRepositoryInterface {
    private readonly AppearancesRepository;
    constructor(AppearancesRepository: Repository<Appearance>);
}
