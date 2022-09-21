import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Limit number of results for pagination',
    minimum: 1,
    maximum: 1000,
    format: 'int32',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
  @ApiProperty({
    required: false,
    type: Number,
    description: 'Offset number of results for pagination',
    minimum: 0,
    format: 'int32',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset: number;
  @ApiProperty({
    required: false,
    type: String,
    description: 'Title of the movie',
  })
  @IsOptional()
  title: string;
}
