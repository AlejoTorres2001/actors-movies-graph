import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../shared/dto/index';

export class MoviesQueryDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Title of the movie',
  })
  @IsAscii()
  @IsOptional()
  title: string;
}
