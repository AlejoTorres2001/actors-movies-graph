import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsNumber, MaxLength } from 'class-validator';
export class CreateActorDto {
  @ApiProperty({ required: true })
  @IsAscii()
  @MaxLength(40)
  @AutoMap()
  name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @AutoMap()
  birthYear: number;
}
