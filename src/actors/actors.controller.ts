import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ActorsService } from './actors.service';
import { CreateActorDto, PaginationQueryDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';
@ApiTags('actors')
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}
  @ApiCreatedResponse({ type: Actor })
  @Post()
  create(@Body() createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorsService.create(createActorDto);
  }
  @ApiCreatedResponse({ type: [Actor] })
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
  @ApiParam({
    name: 'name',
    type: String,
    required: false,
    description: 'Name of the actor',
  })
  @Get()
  findAll(
    @Query('name') name: string,
    @Query() pagination: PaginationQueryDto,
  ): Promise<Actor[]> {
    if (name) {
      return this.actorsService.findAll(pagination, name);
    }
    return this.actorsService.findAll(pagination);
  }
  @ApiNotFoundResponse()
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the actor',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Actor> {
    return this.actorsService.findOne(id);
  }
  @ApiNotFoundResponse()
  @ApiCreatedResponse({ type: Actor })
  @ApiBody({ type: UpdateActorDto })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the actor',
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActorDto: UpdateActorDto,
  ): Promise<Actor> {
    return this.actorsService.update(id, updateActorDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the actor',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.actorsService.remove(id);
  }
}
