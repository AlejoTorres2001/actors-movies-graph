import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  createMovieDto,
  MoviesQueryDto,
  ReadMovieDto,
  updateMovieDto,
} from './dto';
import { MoviesServiceInterface } from './interfaces/movies.service.interface';
import { HttpErrorMessage } from 'src/shared/entities/http-error-message.entity';

@ApiTags('movies')
@Controller('api/movies')
export class MoviesController {
  constructor(
    @Inject('MovieServiceInterface')
    private MoviesService: MoviesServiceInterface,
  ) {}
  @ApiCreatedResponse({ type: [ReadMovieDto] })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @Get()
  async getMovies(
    @Query() pagination: MoviesQueryDto,
  ): Promise<ReadMovieDto[]> {
    let foundMovies: ReadMovieDto[];
    try {
      foundMovies = await this.MoviesService.findAll(pagination);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (foundMovies.length === 0) {
      throw new NotFoundException(
        `Movies with name ${pagination.title} not found.`,
      );
    }
    return foundMovies;
  }
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the movie',
  })
  @ApiCreatedResponse({ type: ReadMovieDto })
  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @Get(':id')
  async getMovieById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadMovieDto> {
    let foundMovie: ReadMovieDto;
    try {
      foundMovie = await this.MoviesService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!foundMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return foundMovie;
  }
  @ApiCreatedResponse({ type: ReadMovieDto })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @Post()
  async createMovie(@Body() Body: createMovieDto): Promise<ReadMovieDto> {
    try {
      return await this.MoviesService.create(Body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @ApiCreatedResponse({ type: ReadMovieDto })
  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @ApiBody({ type: updateMovieDto })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the movie',
  })
  @Put(':id')
  async updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: updateMovieDto,
  ): Promise<ReadMovieDto> {
    let updatedMovie: ReadMovieDto;
    try {
      updatedMovie = await this.MoviesService.update(id, Body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!updatedMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return updatedMovie;
  }
  @ApiCreatedResponse({
    type: null,
  })
  @ApiNotFoundResponse({
    description: 'Movie not found',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the movie',
  })
  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @Delete(':id')
  async deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    let removedMovie: ReadMovieDto;
    try {
      removedMovie = await this.MoviesService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!removedMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
  }
  @Post('/many')
  @ApiCreatedResponse({ type: [Movie] })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @ApiBody({ type: [createMovieDto] })
  async CreateMany(@Body() movies: createMovieDto[]): Promise<ReadMovieDto[]> {
    let createdMovies: ReadMovieDto[];
    try {
      createdMovies = await this.MoviesService.createMany(movies);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (createdMovies.length === 0) {
      throw new NotFoundException(`no movies data provided`);
    }
    return createdMovies;
  }
}
