import { ApiProperty } from '@nestjs/swagger';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@Entity({
  name: 'movies',
})
@ObjectType()
export class Movie {
  @Field((type) => Int)
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Field((type) => String)
  @ApiProperty({ required: true })
  @Column()
  title: string;
  @Field((type) => Int)
  @ApiProperty({ required: true })
  @Column()
  year: number;
  @Field((type) => [Appearance])
  @OneToMany(() => Appearance, (appearance) => appearance.movie)
  appearances: Appearance[];
}
