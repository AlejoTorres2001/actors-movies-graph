import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../shared/dto/index';

export class ActorsQueryDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
    description: 'Name of the actor',
    type: String,
  })
  @IsOptional()
  @IsAscii()
  name: string;
}
