import { IsAscii, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class updateMovieDto {
  @ApiProperty({ required: false })
  @IsAscii()
  @IsOptional()
  title: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  year: number;
}
