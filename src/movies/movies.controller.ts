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
import { createMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { updateMovieDto } from './dto/update-movie.dto';
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private MoviesService: MoviesService) {}
  @ApiCreatedResponse({ type: [Movie] })
  @ApiParam({ name: 'title', type: String, required: false })
  @Get()
  getMovies(@Query('title') title: string): Promise<Movie[]> {
    if (title) {
      return this.MoviesService.findAll(title);
    }
    return this.MoviesService.findAll();
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
