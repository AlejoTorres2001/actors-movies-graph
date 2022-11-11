import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @AutoMap()
  email: string;
  @MinLength(8)
  @ApiProperty({ required: true })
  @AutoMap()
  password: string;
  @ApiProperty({ required: true })
  @AutoMap()
  @IsAlphanumeric()
  username: string;
}
