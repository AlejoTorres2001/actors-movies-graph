import { IsAscii, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
export class updateMovieDto {
  @ApiProperty({ required: false })
  @IsAscii()
  @IsOptional()
  @AutoMap()
  title: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  year: number;
}
