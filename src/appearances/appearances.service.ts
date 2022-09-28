import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';
import { Movie } from 'src/movies/entities/movies.entity';
import { Repository } from 'typeorm';
import {
  AppearancesQueryDto,
  CreateAppearanceDto,
  UpdateAppearanceDto,
} from './dto';
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
  async create({ actorId, movieId }: CreateAppearanceDto): Promise<Appearance> {
    const actor = await this.actorRepository.findOne({
      where: { id: actorId },
    });
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    if (!actor || !movie) {
      return undefined;
    }
    const newAppearance = this.appearanceRepository.create({
      actor,
      movie,
    });
    return await this.appearanceRepository.save(newAppearance);
  }

  async findAll({ limit, offset }: AppearancesQueryDto): Promise<Appearance[]> {
    return await this.appearanceRepository.find({
      relations: ['actor', 'movie'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Appearance> {
    const foundAppearance = await this.appearanceRepository.findOne({
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
    const actor = await this.actorRepository.findOne({
      where: { id: actorIdForUpdate },
    });
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieIdForUpdate,
      },
    });
    if (!actor || !movie || !appearance) {
      return undefined;
    }
    appearance.actor = actor;
    appearance.movie = movie;
    return await this.appearanceRepository.save(appearance);
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
  async createMany(appearances: CreateAppearanceDto[]): Promise<Appearance[]> {
    const newAppearances = [];
    for (const appearance of appearances) {
      const newAppearance = await this.create(appearance);
      newAppearances.push(newAppearance);
    }
    return newAppearances;
  }
}
