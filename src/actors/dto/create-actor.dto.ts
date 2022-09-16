import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNumber, MaxLength } from 'class-validator';
export class CreateActorDto {
  @ApiProperty({ required: true })
  @IsAlpha()
  @MaxLength(40)
  name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  birthYear: number;
}
