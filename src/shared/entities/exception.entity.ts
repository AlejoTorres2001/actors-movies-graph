import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'Exception',
})
export class Exception {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;
  @Column()
  name: string;
  @Column()
  stack: string;
  @Column()
  date: Date;
}
