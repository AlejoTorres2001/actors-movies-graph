import { ApiProperty } from '@nestjs/swagger';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';
@Entity({
  name: 'movies',
})
@ObjectType()
export class Movie {
  @Field((type) => Int)
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  id: number;
  @Field((type) => String)
  @ApiProperty({ required: true })
  @Column()
  @AutoMap()
  title: string;
  @Field((type) => Int)
  @ApiProperty({ required: true })
  @Column()
  @AutoMap()
  year: number;
  @Field((type) => [Appearance])
  @OneToMany(() => Appearance, (appearance) => appearance.movie)
  @AutoMap(() => Appearance)
  appearances: Appearance[];
}
