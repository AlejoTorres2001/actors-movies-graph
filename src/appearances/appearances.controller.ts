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
  Inject,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpErrorMessage } from 'src/shared/entities/http-error-message.entity';

import {
  AppearancesQueryDto,
  CreateAppearanceDto,
  UpdateAppearanceDto,
} from './dto';
import { ReadAppearanceDto } from './dto/read-appearances.dto';
import { Appearance } from './entities/appearance.entity';
import { AppearancesServiceInterface } from './interfaces/apperances.service.interface';
@ApiTags('appearances')
@Controller('appearances')
export class AppearancesController {
  constructor(
    @Inject('AppearancesServiceInterface')
    private readonly appearancesService: AppearancesServiceInterface,
  ) {}
  @Post()
  @ApiCreatedResponse({
    type: Appearance,
  })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  async create(
    @Body() createAppearanceDto: CreateAppearanceDto,
  ): Promise<ReadAppearanceDto> {
    let createdAppearance: ReadAppearanceDto;
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
  @Get()
  @ApiResponse({
    type: ReadAppearanceDto,
  })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  async findAll(
    @Query() pagination: AppearancesQueryDto,
  ): Promise<ReadAppearanceDto[]> {
    let foundAppearances: ReadAppearanceDto[];
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
    type: HttpErrorMessage,
  })
  @Get(':id')
  @ApiResponse({
    type: Appearance,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the appearance',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadAppearanceDto> {
    let foundAppearance: ReadAppearanceDto;
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
  @ApiNotFoundResponse({
    type: HttpErrorMessage,
  })
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
  ): Promise<ReadAppearanceDto> {
    let updatedAppearance: ReadAppearanceDto;
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
  @ApiNotFoundResponse({
    type: HttpErrorMessage,
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id of the appearance',
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    let removedAppearance: ReadAppearanceDto;
    try {
      removedAppearance = await this.appearancesService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!removedAppearance) {
      throw new NotFoundException(`Actor with ID ${id} not found.`);
    }
  }
  @Post('/many')
  @ApiCreatedResponse({ type: [Appearance] })
  @ApiBody({ type: [CreateAppearanceDto] })
  @ApiInternalServerErrorResponse({
    type: HttpErrorMessage,
  })
  async createMany(@Body() createAppearanceDto: CreateAppearanceDto[]) {
    let createdAppearances: ReadAppearanceDto[];
    try {
      createdAppearances = await this.appearancesService.createMany(
        createAppearanceDto,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (createdAppearances.length === 0) {
      throw new NotFoundException(
        `no Appearances created. Check if the actors and movies exist`,
      );
    }
    return createdAppearances;
  }
}
