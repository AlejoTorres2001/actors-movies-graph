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
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ActorsService } from './actors.service';
import { ActorsQueryDto, CreateActorDto, UpdateActorDto } from './dto';
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
  @Get()
  async findAll(@Query() pagination: ActorsQueryDto): Promise<Actor[]> {
    let foundActors: Actor[];
    try {
      foundActors = await this.actorsService.findAll(pagination);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (foundActors.length === 0) {
      throw new NotFoundException(
        `Actors with name ${pagination.name} not found.`,
      );
    }
    return foundActors;
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
