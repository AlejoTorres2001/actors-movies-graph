import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsNumber, IsOptional } from 'class-validator';

export class UpdateActorDto {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsAscii()
  @IsOptional()
  name: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  birthYear: number;
}
