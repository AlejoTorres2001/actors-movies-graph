import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { createMovieDto, MoviesQueryDto, updateMovieDto } from './dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private MoviesService: MoviesService) {}
  @ApiCreatedResponse({ type: [Movie] })
  @Get()
  async getMovies(@Query() pagination: MoviesQueryDto): Promise<Movie[]> {
    let foundMovies: Movie[];
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
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the movie',
  })
  @Get(':id')
  async getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    let foundMovie: Movie;
    try {
      foundMovie = await this.MoviesService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!foundMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return foundMovie;
  }
  @ApiCreatedResponse({ type: Movie })
  @Post()
  async createMovie(@Body() Body: createMovieDto): Promise<Movie> {
    try {
      return await this.MoviesService.createMovie(Body);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiCreatedResponse({ type: Movie })
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
  ): Promise<Movie> {
    let updatedMovie: Movie;
    try {
      updatedMovie = await this.MoviesService.updateMovie(id, Body);
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
  @Delete(':id')
  async deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    let removedMovie: Movie;
    try {
      removedMovie = await this.MoviesService.deleteMovie(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!removedMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
  }
  @Post('/many')
  @ApiCreatedResponse({ type: [Movie] })
  @ApiBody({ type: [createMovieDto] })
  async CreateMany(@Body() movies: createMovieDto[]): Promise<Movie[]> {
    let createdMovies: Movie[];
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
