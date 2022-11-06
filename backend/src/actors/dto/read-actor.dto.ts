import { AutoMap } from '@automapper/classes';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsAscii, IsNumber, IsOptional } from 'class-validator';
@ObjectType()
export class ReadActorDto {
  @ApiProperty({ required: true })
  @AutoMap()
  @Field((type) => Int)
  id: number;
  @ApiProperty({ required: true })
  @IsAscii()
  @AutoMap()
  @Field((type) => String)
  name: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
  @AutoMap()
  @Field((type) => Int)
  birthYear: number;
}
