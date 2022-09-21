import { ApiProperty } from '@nestjs/swagger';
import {IsAscii, IsNumber, MaxLength } from 'class-validator';
export class CreateActorDto {
  @ApiProperty({ required: true })
  @IsAscii()
  @MaxLength(40)
  name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  birthYear: number;
}
