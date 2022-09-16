import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'actors',
})
export class Actor {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  @Column()
  birthYear: number;
}
