import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/actors/dto';
import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Repository } from 'typeorm';
import { CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { Appearance } from './entities/appearance.entity';

@Injectable()
export class AppearancesService {
  constructor(
    @InjectRepository(Appearance)
    private readonly appearanceRepository: Repository<Appearance>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async create(createAppearanceDto: CreateAppearanceDto): Promise<Appearance> {
    try {
      const { actorId, movieId } = createAppearanceDto;
      const actor = await this.actorRepository.findOne({
        where: { id: actorId },
      });
      const movie = await this.movieRepository.findOne({
        where: { id: movieId },
      });
      if (!actor || !movie) {
        throw new NotFoundException(`Actor or Movie not found.`);
      }
      const newAppearance = this.appearanceRepository.create({
        actor,
        movie,
      });
      return await this.appearanceRepository.save(newAppearance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(pagination: PaginationQueryDto): Promise<Appearance[]> {
    try {
      const { limit, offset } = pagination;
      return await this.appearanceRepository.find({
        relations: ['actor', 'movie'],
        skip: offset,
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Appearance> {
    try {
      const foundAppearance = await this.appearanceRepository.findOne({
        where: { id: id },
        relations: ['actor', 'movie'],
      });
      if (!foundAppearance) {
        throw new NotFoundException(`Appearance with ID ${id} not found.`);
      }
      return foundAppearance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateAppearanceDto: UpdateAppearanceDto) {
    try {
      const appearance = await this.findOne(id);
      const { actorId, movieId } = updateAppearanceDto;
      const actorIdForUpdate = actorId ? actorId : appearance.actor.id;
      const movieIdForUpdate = movieId ? movieId : appearance.movie.id;
      const actor = await this.actorRepository.findOne({
        where: { id: actorIdForUpdate },
      });
      const movie = await this.movieRepository.findOne({
        where: {
          id: movieIdForUpdate,
        },
      });
      if (!actor || !movie || !appearance) {
        throw new NotFoundException(`Actor, Movie or Appearance not found.`);
      }
      appearance.actor = actor;
      appearance.movie = movie;
      return await this.appearanceRepository.save(appearance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const foundAppearance = await this.appearanceRepository.findOne({
        where: { id: id },
      });
      if (!foundAppearance) {
        throw new NotFoundException(`Appearance with ID ${id} not found.`);
      }
      await this.appearanceRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
