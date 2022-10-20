import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { AppearancesRepositoryInterface } from 'src/appearances/interfaces/apperances.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class AppearancesRepository
  extends BaseAbstractRepository<Appearance>
  implements AppearancesRepositoryInterface
{
  constructor(
    @InjectRepository(Appearance)
    private readonly AppearancesRepository: Repository<Appearance>,
  ) {
    super(AppearancesRepository);
  }
}
