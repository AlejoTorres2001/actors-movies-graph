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
  @ApiParam({ name: 'title', type: String, required: false })
  @ApiParam({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit number of results for pagination',
  })
  @ApiParam({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Offset number of results for pagination',
  })
  @Get()
  getMovies(
    @Query('title') title: string,
    @Query() pagination: PaginationQueryDto,
  ): Promise<Movie[]> {
    if (title) {
      return this.MoviesService.findAll(pagination, title);
    }
    return this.MoviesService.findAll(pagination);
  }
  @ApiNotFoundResponse()
  @Get(':id')
  getMovieById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.MoviesService.findById(id);
  }
  @ApiCreatedResponse({ type: Movie })
  @Post()
  createMovie(@Body() Body: createMovieDto): Promise<Movie> {
    return this.MoviesService.createMovie(Body);
  }
  @ApiNotFoundResponse()
  @ApiCreatedResponse({ type: Movie })
  @ApiBody({ type: updateMovieDto })
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
  @ApiNotFoundResponse()
  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.MoviesService.deleteMovie(id);
  }
}
