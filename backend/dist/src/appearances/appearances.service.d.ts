import { Mapper } from '@automapper/core';
import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import { AppearancesQueryDto, CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { ReadAppearanceDto } from './dto/read-appearances.dto';
import { AppearancesRepositoryInterface } from './interfaces/apperances.repository.interface';
import { AppearancesServiceInterface } from './interfaces/apperances.service.interface';
export declare class AppearancesService implements AppearancesServiceInterface {
    private readonly appearancesRepository;
    private readonly actorsRepository;
    private readonly moviesRepository;
    private readonly classMapper;
    constructor(appearancesRepository: AppearancesRepositoryInterface, actorsRepository: ActorRepositoryInterface, moviesRepository: MoviesRepositoryInterface, classMapper: Mapper);
    create({ actorId, movieId, }: CreateAppearanceDto): Promise<ReadAppearanceDto>;
    findAll({ limit, offset, }: AppearancesQueryDto): Promise<ReadAppearanceDto[]>;
    findOne(id: number): Promise<ReadAppearanceDto>;
    update(id: number, updateAppearanceDto: UpdateAppearanceDto): Promise<ReadAppearanceDto>;
    remove(id: number): Promise<ReadAppearanceDto>;
    createMany(appearances: CreateAppearanceDto[]): Promise<ReadAppearanceDto[]>;
}
