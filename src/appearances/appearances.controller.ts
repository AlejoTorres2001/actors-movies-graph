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
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/actors/dto';
import { AppearancesService } from './appearances.service';
import { CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { Appearance } from './entities/appearance.entity';
@ApiTags('appearances')
@Controller('appearances')
export class AppearancesController {
  constructor(private readonly appearancesService: AppearancesService) {}
  @Post()
  create(
    @Body() createAppearanceDto: CreateAppearanceDto,
  ): Promise<Appearance> {
    return this.appearancesService.create(createAppearanceDto);
  }
  @ApiCreatedResponse({
    type: Appearance,
  })
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
  findAll(@Query() pagination: PaginationQueryDto): Promise<Appearance[]> {
    return this.appearancesService.findAll(pagination);
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Appearance> {
    return this.appearancesService.findOne(id);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppearanceDto: UpdateAppearanceDto,
  ): Promise<Appearance> {
    return this.appearancesService.update(id, updateAppearanceDto);
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
