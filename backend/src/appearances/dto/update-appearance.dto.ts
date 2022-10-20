import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAppearanceDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  actorId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  movieId: number;
}
