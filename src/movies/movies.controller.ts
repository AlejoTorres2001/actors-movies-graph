import {
  Body,
  Controller,
  Delete,
  Get,
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
} from '@nestjs/swagger';
import { createMovieDto, updateMovieDto } from './dto';
import { PaginationQueryDto } from 'src/actors/dto';
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private MoviesService: MoviesService) {}
  @ApiCreatedResponse({ type: [Movie] })
  @Get()
  getMovies(@Query() pagination: PaginationQueryDto): Promise<Movie[]> {
    return this.MoviesService.findAll(pagination);
  }
  @ApiNotFoundResponse({
    description: 'Movie not found',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the movie',
  })
  @Get(':id')
  getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.MoviesService.findById(id);
  }
  @ApiCreatedResponse({ type: Movie })
  @Post()
  createMovie(@Body() Body: createMovieDto): Promise<Movie> {
    return this.MoviesService.createMovie(Body);
  }
  @ApiNotFoundResponse({
    description: 'Movie not found',
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
  updateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Body() Body: updateMovieDto,
  ): Promise<Movie> {
    return this.MoviesService.updateMovie(id, Body);
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
  deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.MoviesService.deleteMovie(id);
  }
}
