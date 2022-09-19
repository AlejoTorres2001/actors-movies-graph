import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppearancesService } from './appearances.service';
import { CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { Appearance } from './entities/appearance.entity';
@ApiTags('appearances')
@Controller('appearances')
export class AppearancesController {
  constructor(private readonly appearancesService: AppearancesService) {}
  @ApiCreatedResponse({ type: [Appearance] })
  @Post()
  create(
    @Body() createAppearanceDto: CreateAppearanceDto,
  ): Promise<Appearance> {
    return this.appearancesService.create(createAppearanceDto);
  }
  @ApiCreatedResponse({ type: [Appearance] })
  @Get()
  findAll(): Promise<Appearance[]> {
    return this.appearancesService.findAll();
  }
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Appearance> {
    return this.appearancesService.findOne(id);
  }
  @ApiNotFoundResponse()
  @ApiCreatedResponse({ type: Appearance })
  @ApiBody({ type: UpdateAppearanceDto })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppearanceDto: UpdateAppearanceDto,
  ): Promise<Appearance> {
    return this.appearancesService.update(id, updateAppearanceDto);
  }
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appearancesService.remove(id);
  }
}
