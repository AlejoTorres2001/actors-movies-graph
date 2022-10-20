import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UpdateAppearanceDto } from 'src/appearances/dto';
import { ReadAppearanceDto } from 'src/appearances/dto/read-appearances.dto';
import { Appearance } from 'src/appearances/entities/appearance.entity';

@Injectable()
export class AppearanceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Appearance, ReadAppearanceDto);
      createMap(
        mapper,
        ReadAppearanceDto,
        Appearance,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, UpdateAppearanceDto, Appearance);
    };
  }
}
