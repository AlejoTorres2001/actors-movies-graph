import { AutoMap } from '@automapper/classes';
import { IsAscii, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class ReadMovieDto {
  @ApiProperty({ required: true })
  @AutoMap()
  @Field((type) => Int)
  id: number;
  @ApiProperty({ required: true })
  @AutoMap()
  @IsAscii()
  @Field((type) => String)
  title: string;
  @ApiProperty({ required: true })
  @AutoMap()
  @IsNumber()
  @Field((type) => Int)
  year: number;
}
