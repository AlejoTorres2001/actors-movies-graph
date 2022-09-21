import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { AppearancesService } from './appearances.service';
import {
  AppearancesQueryDto,
  CreateAppearanceDto,
  UpdateAppearanceDto,
} from './dto';
import { Appearance } from './entities/appearance.entity';
@ApiTags('appearances')
@Controller('appearances')
export class AppearancesController {
  constructor(private readonly appearancesService: AppearancesService) {}
  @Post()
  async create(
    @Body() createAppearanceDto: CreateAppearanceDto,
  ): Promise<Appearance> {
    let createdAppearance: Appearance;
    try {
      createdAppearance = await this.appearancesService.create(
        createAppearanceDto,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!createdAppearance) {
      throw new InternalServerErrorException(
        `actor ${createAppearanceDto.actorId} or movie ${createAppearanceDto.movieId} not found  `,
      );
    }
    return createdAppearance;
  }
  @ApiCreatedResponse({
    type: Appearance,
  })
  @Get()
  async findAll(
    @Query() pagination: AppearancesQueryDto,
  ): Promise<Appearance[]> {
    let foundAppearances: Appearance[];
    try {
      foundAppearances = await this.appearancesService.findAll(pagination);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (foundAppearances.length === 0) {
      throw new NotFoundException(`no Appearances found.`);
    }
    return foundAppearances;
  }
  @ApiNotFoundResponse({
    description: 'The appearance with the given id was not found',
  })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the appearance',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Appearance> {
    let foundAppearance: Appearance;
    try {
      foundAppearance = await this.appearancesService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!foundAppearance) {
      throw new NotFoundException(`Appearance with ID ${id} not found.`);
    }
    return foundAppearance;
  }
  @ApiNotFoundResponse({ description: 'Appearance not found' })
  @ApiCreatedResponse({ type: Appearance })
  @ApiBody({ type: UpdateAppearanceDto })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the appearance',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppearanceDto: UpdateAppearanceDto,
  ): Promise<Appearance> {
    let updatedAppearance: Appearance;
    try {
      updatedAppearance = await this.appearancesService.update(
        id,
        updateAppearanceDto,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!updatedAppearance) {
      throw new NotFoundException(
        `Appearance with ID ${id}, Movie with ID ${updateAppearanceDto?.movieId} or Actor ID ${updateAppearanceDto?.actorId} not found.`,
      );
    }
    return updatedAppearance;
  }
  @ApiNotFoundResponse({ description: 'Appearance not found' })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the appearance',
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appearancesService.remove(id);
  }
}
