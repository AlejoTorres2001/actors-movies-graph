import { ApiProperty } from '@nestjs/swagger';
import { Appearance } from 'src/appearances/entities/appearance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  @OneToMany(() => Appearance, (appearance) => appearance.actor)
  appearances: Appearance[];
}
