import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAppearanceDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @AutoMap()
  actorId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @AutoMap()
  movieId: number;
}
