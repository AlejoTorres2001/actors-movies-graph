import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsEmail } from 'class-validator';

export class ReadUserDto {
  @ApiProperty({ required: true })
  @AutoMap()
  id: string;
  @ApiProperty({ required: true })
  @IsEmail()
  @AutoMap()
  email: string;
  @ApiProperty({ required: true })
  @AutoMap()
  @IsAscii()
  username: string;
}
