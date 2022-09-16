import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppearancesService } from './appearances.service';
import { CreateAppearanceDto } from './dto/create-appearance.dto';
import { UpdateAppearanceDto } from './dto/update-appearance.dto';

@Controller('appearances')
export class AppearancesController {
  constructor(private readonly appearancesService: AppearancesService) {}

  @Post()
  create(@Body() createAppearanceDto: CreateAppearanceDto) {
    return this.appearancesService.create(createAppearanceDto);
  }

  @Get()
  findAll() {
    return this.appearancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appearancesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppearanceDto: UpdateAppearanceDto,
  ) {
    return this.appearancesService.update(+id, updateAppearanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appearancesService.remove(+id);
  }
}
