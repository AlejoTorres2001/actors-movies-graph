import { ApiProperty } from '@nestjs/swagger';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@Entity({
  name: 'actors',
})
@ObjectType()
export class Actor {
  @Field((type) => Int)
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Field((type) => String)
  @Column()
  @ApiProperty({ required: true })
  name: string;
  @Field((type) => String)
  @ApiProperty({ required: true })
  @Column()
  birthYear: number;
  @Field((type) => [Appearance])
  @OneToMany(() => Appearance, (appearance) => appearance.actor)
  appearances: Appearance[];
}
