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
  async create(@Body() createActorDto: CreateActorDto): Promise<Actor> {
    try {
      return await this.actorsService.create(createActorDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Actor> {
    let foundActor: Actor;
    try {
      foundActor = await this.actorsService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!foundActor) {
      throw new NotFoundException(`Actor with ID ${id} not found.`);
    }
    return foundActor;
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActorDto: UpdateActorDto,
  ): Promise<Actor> {
    let updatedActor: Actor;
    try {
      updatedActor = await this.actorsService.update(id, updateActorDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!updatedActor) {
      throw new NotFoundException(`Actor with ID ${id} not found.`);
    }
    return updatedActor;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the actor',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    let removedActor: Actor;
    try {
      removedActor = await this.actorsService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!removedActor) {
      throw new NotFoundException(`Actor with ID ${id} not found.`);
    }
  }
  @Post('/many')
  @ApiCreatedResponse({ type: [Actor] })
  @ApiBody({ type: [CreateActorDto] })
  async createMany(@Body() actors: CreateActorDto[]): Promise<Actor[]> {
    let createdActors: Actor[];
    try {
      createdActors = await this.actorsService.createMany(actors);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (createdActors.length === 0) {
      throw new NotFoundException(`no Actors data provided`);
    }
    return createdActors;
  }
}
