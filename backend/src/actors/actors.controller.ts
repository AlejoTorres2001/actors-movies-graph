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
  Inject,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HttpErrorMessage } from 'src/shared/entities/http-error-message.entity';
import {
  ActorsQueryDto,
  CreateActorDto,
  ReadActorDto,
  UpdateActorDto,
} from './dto';
import { Actor } from './entities/actor.entity';
import { ActorsServiceInterface } from './interfaces/actors.service.interface';
@ApiTags('actors')
@Controller('/api/actors')
export class ActorsController {
  constructor(
    @Inject('ActorsServiceInterface')
    private readonly actorsService: ActorsServiceInterface,
  ) {}
  @ApiCreatedResponse({ type: ReadActorDto })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @Post()
  async create(@Body() createActorDto: CreateActorDto): Promise<ReadActorDto> {
    try {
      return await this.actorsService.create(createActorDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @ApiCreatedResponse({ type: [ReadActorDto] })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @Get()
  async findAll(@Query() pagination: ActorsQueryDto): Promise<ReadActorDto[]> {
    let foundActors: ReadActorDto[];
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
  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the actor',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ReadActorDto> {
    let foundActor: ReadActorDto;
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
  @ApiNotFoundResponse({ type: HttpErrorMessage })
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
  ): Promise<ReadActorDto> {
    let updatedActor: ReadActorDto;
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
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the actor',
  })
  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    let removedActor: ReadActorDto;
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
  @ApiCreatedResponse({ type: [ReadActorDto] })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @ApiBody({ type: [CreateActorDto] })
  async createMany(@Body() actors: CreateActorDto[]): Promise<ReadActorDto[]> {
    let createdActors: ReadActorDto[];
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
