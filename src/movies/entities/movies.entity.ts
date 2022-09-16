import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
