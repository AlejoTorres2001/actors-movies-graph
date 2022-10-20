import { AppearancesQueryDto, CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { ReadAppearanceDto } from './dto/read-appearances.dto';
import { AppearancesServiceInterface } from './interfaces/apperances.service.interface';
export declare class AppearancesController {
    private readonly appearancesService;
    constructor(appearancesService: AppearancesServiceInterface);
    create(createAppearanceDto: CreateAppearanceDto): Promise<ReadAppearanceDto>;
    findAll(pagination: AppearancesQueryDto): Promise<ReadAppearanceDto[]>;
    findOne(id: number): Promise<ReadAppearanceDto>;
    update(id: number, updateAppearanceDto: UpdateAppearanceDto): Promise<ReadAppearanceDto>;
    remove(id: number): Promise<void>;
    createMany(createAppearanceDto: CreateAppearanceDto[]): Promise<ReadAppearanceDto[]>;
}
