import {
  AppearancesQueryDto,
  CreateAppearanceDto,
  UpdateAppearanceDto,
} from '../dto';
import { ReadAppearanceDto } from '../dto/read-appearances.dto';
export interface AppearancesServiceInterface {
  create(createActorDto: CreateAppearanceDto): Promise<ReadAppearanceDto>;
  findAll(actorsQueryDto: AppearancesQueryDto): Promise<ReadAppearanceDto[]>;
  findOne(id: number): Promise<ReadAppearanceDto>;
  update(
    id: number,
    updateActorDto: UpdateAppearanceDto,
  ): Promise<ReadAppearanceDto>;
  remove(id: number): Promise<ReadAppearanceDto>;
  createMany(
    createActorDto: CreateAppearanceDto[],
  ): Promise<ReadAppearanceDto[]>;
}
