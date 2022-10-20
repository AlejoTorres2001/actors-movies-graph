import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ActorRepositoryInterface } from 'src/actors/interfaces/actors.repository.interface';
import { MoviesRepositoryInterface } from 'src/movies/interfaces/movies.repository.interface';
import {
  AppearancesQueryDto,
  CreateAppearanceDto,
  UpdateAppearanceDto,
} from './dto';
import { ReadAppearanceDto } from './dto/read-appearances.dto';
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
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async create({
    actorId,
    movieId,
  }: CreateAppearanceDto): Promise<ReadAppearanceDto> {
    const actor = await this.actorsRepository.findOneById(actorId);
    const movie = await this.moviesRepository.findOneById(movieId);
    if (!actor || !movie) {
      return undefined;
    }
    const newAppearance = this.appearancesRepository.create({
      actor,
      movie,
    });
    return this.classMapper.map(
      await this.appearancesRepository.save(newAppearance),
      Appearance,
      ReadAppearanceDto,
    );
  }

  async findAll({
    limit,
    offset,
  }: AppearancesQueryDto): Promise<ReadAppearanceDto[]> {
    return this.classMapper.mapArray(
      await this.appearancesRepository.findWithRelations({
        relations: ['actor', 'movie'],
        skip: offset,
        take: limit,
      }),
      Appearance,
      ReadAppearanceDto,
    );
  }

  async findOne(id: number): Promise<ReadAppearanceDto> {
    const foundAppearance = await this.appearancesRepository.findByCondition({
      where: { id: id },
      relations: ['actor', 'movie'],
    });
    return this.classMapper.map(foundAppearance, Appearance, ReadAppearanceDto);
  }

  async update(
    id: number,
    updateAppearanceDto: UpdateAppearanceDto,
  ): Promise<ReadAppearanceDto> {
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
    return this.classMapper.map(
      await this.appearancesRepository.save(appearance),
      Appearance,
      ReadAppearanceDto,
    );
  }

  async remove(id: number): Promise<ReadAppearanceDto> {
    const foundAppearance = await this.appearancesRepository.findOneById(id);
    if (!foundAppearance) {
      return undefined;
    }
    return this.classMapper.map(
      await this.appearancesRepository.remove(foundAppearance),
      Appearance,
      ReadAppearanceDto,
    );
  }
  async createMany(
    appearances: CreateAppearanceDto[],
  ): Promise<ReadAppearanceDto[]> {
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
    return this.classMapper.mapArray(
      await this.appearancesRepository.saveMany(newAppearances),
      Appearance,
      ReadAppearanceDto,
    );
  }
}
