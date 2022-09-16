import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAppearanceDto {
  @ApiProperty({ required: true })
  @IsNumber()
  actorId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  movieId: number;
}
