import { IsAlphanumeric, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class updateMovieDto {
  @ApiProperty({ required: false })
  @IsAlphanumeric()
  @IsOptional()
  title: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  year: number;
}
