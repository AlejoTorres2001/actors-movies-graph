import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { Movie } from 'src/movies/entities/movies.entity';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import { Repository } from 'typeorm';
import {
  AppearancesQueryDto,
  CreateAppearanceDto,
  UpdateAppearanceDto,
} from './dto';
import { Appearance } from './entities/appearance.entity';
import { AppearancesRepositoryInterface } from './interfaces/apperances.repository.interface';
import { AppearancesServiceInterface } from './interfaces/apperances.service.interface';

@Injectable()
export class AppearancesService implements AppearancesServiceInterface {
  constructor(
    @Inject('AppearancesRepositoryInterface')
    private readonly appearancesRepository: AppearancesRepositoryInterface,
    @Inject('ActorRepositoryInterface')
    private readonly actorsRepository: ActorRepositoryInterface,
    @Inject('MovieRepositoryInterface')
    private readonly moviesRepository: MoviesRepositoryInterface,
  ) {}
  async create({ actorId, movieId }: CreateAppearanceDto): Promise<Appearance> {
    const actor = await this.actorsRepository.findOneById(actorId);
    const movie = await this.moviesRepository.findOneById(movieId);
    if (!actor || !movie) {
      return undefined;
    }
    const newAppearance = this.appearancesRepository.create({
      actor,
      movie,
    });
    return await this.appearancesRepository.save(newAppearance);
  }

  async findAll({ limit, offset }: AppearancesQueryDto): Promise<Appearance[]> {
    return await this.appearancesRepository.findWithRelations({
      relations: ['actor', 'movie'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Appearance> {
    const foundAppearance = await this.appearancesRepository.findByCondition({
      where: { id: id },
      relations: ['actor', 'movie'],
    });
    return foundAppearance;
  }

  async update(id: number, updateAppearanceDto: UpdateAppearanceDto) {
    const appearance = await this.findOne(id);
    const { actorId, movieId } = updateAppearanceDto;
    const actorIdForUpdate = actorId ? actorId : appearance.actor.id;
    const movieIdForUpdate = movieId ? movieId : appearance.movie.id;
    const actor = await this.actorsRepository.findOneById(actorIdForUpdate);
    const movie = await this.moviesRepository.findOneById(movieIdForUpdate);
    if (!actor || !movie || !appearance) {
      return undefined;
    }
    appearance.actor = actor;
    appearance.movie = movie;
    return await this.appearancesRepository.save(appearance);
  }

  async remove(id: number): Promise<Appearance> {
    const foundAppearance = await this.appearancesRepository.findOneById(id);
    if (!foundAppearance) {
      return undefined;
    }
    return await this.appearancesRepository.remove(foundAppearance);
  }
  async createMany(appearances: CreateAppearanceDto[]): Promise<Appearance[]> {
    const actors = await this.actorsRepository.findAll();
    const movies = await this.moviesRepository.findAll();
    const newAppearances = appearances.map((appearance) => {
      const actor = actors.find((actor) => actor.id === appearance.actorId);
      const movie = movies.find((movie) => movie.id === appearance.movieId);
      return this.appearancesRepository.create({
        actor,
        movie,
      });
    });
    return await this.appearancesRepository.saveMany(newAppearances);
  }
}
