import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../shared/dto/index';

export class UsersQueryDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
    description: 'Email substring of the user',
    type: String,
  })
  @IsOptional()
  @IsAscii()
  username: string;
}
