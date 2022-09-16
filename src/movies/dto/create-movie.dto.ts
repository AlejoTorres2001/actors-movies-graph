import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNumber, MaxLength } from 'class-validator';
export class createMovieDto {
  @ApiProperty({ required: true })
  @IsAlphanumeric()
  @MaxLength(40)
  title: string;
  @ApiProperty({ required: true })
  @IsNumber()
  year: number;
}
