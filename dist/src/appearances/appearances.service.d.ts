import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import { AppearancesQueryDto, CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { Appearance } from './entities/appearance.entity';
import { AppearancesRepositoryInterface } from './interfaces/apperances.repository.interface';
import { AppearancesServiceInterface } from './interfaces/apperances.service.interface';
export declare class AppearancesService implements AppearancesServiceInterface {
    private readonly appearancesRepository;
    private readonly actorsRepository;
    private readonly moviesRepository;
    constructor(appearancesRepository: AppearancesRepositoryInterface, actorsRepository: ActorRepositoryInterface, moviesRepository: MoviesRepositoryInterface);
    create({ actorId, movieId }: CreateAppearanceDto): Promise<Appearance>;
    findAll({ limit, offset }: AppearancesQueryDto): Promise<Appearance[]>;
    findOne(id: number): Promise<Appearance>;
    update(id: number, updateAppearanceDto: UpdateAppearanceDto): Promise<Appearance>;
    remove(id: number): Promise<Appearance>;
    createMany(appearances: CreateAppearanceDto[]): Promise<Appearance[]>;
}
