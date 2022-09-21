import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, MaxLength, IsAscii } from 'class-validator';
export class createMovieDto {
  @ApiProperty({ required: true })
  @IsAscii()
  @MaxLength(40)
  title: string;
  @ApiProperty({ required: true })
  @IsNumber()
  year: number;
}
