import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateActorDto, ReadActorDto, UpdateActorDto } from 'src/actors/dto';
import { Actor } from 'src/actors/entities/actor.entity';

@Injectable()
export class ActorProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Actor, ReadActorDto);
      createMap(
        mapper,
        CreateActorDto,
        Actor,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, UpdateActorDto, Actor);
    };
  }
}
