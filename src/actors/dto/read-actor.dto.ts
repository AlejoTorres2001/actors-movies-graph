import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsNumber, IsOptional } from 'class-validator';

export class ReadActorDto {
  @AutoMap()
  @ApiProperty({ required: true })
  id: number;
  @ApiProperty({ required: true })
  @IsAscii()
  @AutoMap()
  name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  birthYear: number;
}
