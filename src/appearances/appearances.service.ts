import { Injectable } from '@nestjs/common';
import { CreateAppearanceDto } from './dto/create-appearance.dto';
import { UpdateAppearanceDto } from './dto/update-appearance.dto';

@Injectable()
export class AppearancesService {
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
