import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNumber, IsOptional } from 'class-validator';

export class UpdateActorDto {
  @ApiProperty({ required: false })
  @IsAlpha()
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  birthYear: number;
}
