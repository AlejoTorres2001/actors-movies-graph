import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppearanceDto } from './dto/create-appearance.dto';
import { UpdateAppearanceDto } from './dto/update-appearance.dto';
import { Appearance } from './entities/appearance.entity';

@Injectable()
export class AppearancesService {
  constructor(
    @InjectRepository(Appearance)
    private readonly appearanceRepository: Repository<Appearance>,
  ) {}
  create(createAppearanceDto: CreateAppearanceDto) {
    return 'This action adds a new appearance';
  }

  findAll() {
    return `This action returns all appearances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appearance`;
  }

  update(id: number, updateAppearanceDto: UpdateAppearanceDto) {
    return `This action updates a #${id} appearance`;
  }

  remove(id: number) {
    return `This action removes a #${id} appearance`;
  }
}
