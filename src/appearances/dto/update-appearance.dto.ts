import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAppearanceDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  actorId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  movieId: number;
}
