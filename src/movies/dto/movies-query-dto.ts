import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../shared/dto/index';

export class MoviesQueryDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Title of the movie',
  })
  @IsOptional()
  title: string;
}
