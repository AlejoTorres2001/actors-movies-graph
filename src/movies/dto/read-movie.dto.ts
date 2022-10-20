import { AutoMap } from '@automapper/classes';
import { IsAscii, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReadMovieDto {
  @ApiProperty({ required: true })
  @AutoMap()
  id: number;
  @ApiProperty({ required: true })
  @AutoMap()
  @IsAscii()
  title: string;
  @ApiProperty({ required: true })
  @AutoMap()
  @IsNumber()
  year: number;
}
