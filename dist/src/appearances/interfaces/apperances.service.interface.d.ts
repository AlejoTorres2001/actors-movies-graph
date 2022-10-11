import { AppearancesQueryDto, CreateAppearanceDto, UpdateAppearanceDto } from '../dto';
import { Appearance } from '../entities/appearance.entity';
export interface AppearancesServiceInterface {
    create(createActorDto: CreateAppearanceDto): Promise<Appearance>;
    findAll(actorsQueryDto: AppearancesQueryDto): Promise<Appearance[]>;
    findOne(id: number): Promise<Appearance>;
    update(id: number, updateActorDto: UpdateAppearanceDto): Promise<Appearance>;
    remove(id: number): Promise<Appearance>;
    createMany(createActorDto: CreateAppearanceDto[]): Promise<Appearance[]>;
}
