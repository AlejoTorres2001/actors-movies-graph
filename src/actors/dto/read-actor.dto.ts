import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsNumber, IsOptional } from 'class-validator';
import { Appearance } from 'src/appearances/entities/appearance.entity';

export class ReadActorDto {
  @AutoMap()
  @ApiProperty({ required: true })
  id: number;
  @ApiProperty({ required: false })
  @IsAscii()
  @AutoMap()
  name: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  birthYear: number;
  @AutoMap(() => Appearance)
  appearances: Appearance[];
}
