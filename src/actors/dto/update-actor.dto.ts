import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsAscii, IsNumber, IsOptional } from 'class-validator';

export class UpdateActorDto {
  @ApiProperty({ required: false })
  @IsAscii()
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  birthYear: number;
}
