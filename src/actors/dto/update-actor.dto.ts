import { PartialType } from '@nestjs/swagger';
import { CreateActorDto } from './create-actor.dto';

export class UpdateActorDto extends PartialType(CreateActorDto) {}
