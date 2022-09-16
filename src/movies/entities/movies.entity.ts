import { ApiProperty } from '@nestjs/swagger';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'movies',
})
export class Movie {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ApiProperty({ required: true })
  @Column()
  title: string;
  @ApiProperty({ required: true })
  @Column()
  year: number;
  @OneToMany(() => Appearance, (appearance) => appearance.movieId)
  appearances: Appearance[];
}
