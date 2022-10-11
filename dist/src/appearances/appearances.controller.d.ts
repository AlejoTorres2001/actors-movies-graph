import { AppearancesQueryDto, CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { Appearance } from './entities/appearance.entity';
import { AppearancesServiceInterface } from './interfaces/apperances.service.interface';
export declare class AppearancesController {
    private readonly appearancesService;
    constructor(appearancesService: AppearancesServiceInterface);
    create(createAppearanceDto: CreateAppearanceDto): Promise<Appearance>;
    findAll(pagination: AppearancesQueryDto): Promise<Appearance[]>;
    findOne(id: number): Promise<Appearance>;
    update(id: number, updateAppearanceDto: UpdateAppearanceDto): Promise<Appearance>;
    remove(id: number): Promise<void>;
    createMany(createAppearanceDto: CreateAppearanceDto[]): Promise<Appearance[]>;
}
