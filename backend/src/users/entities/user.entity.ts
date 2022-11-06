import { AutoMap } from '@automapper/classes';
import * as bcrypt from 'bcrypt';
import { IsAscii, IsEmail, MinLength } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;
  @Column({ unique: true })
  @IsEmail()
  @AutoMap()
  email: string;
  @Column({ unique: true })
  @AutoMap()
  @IsAscii()
  username: string;
  @MinLength(8)
  @Column({ type: 'varchar', length: 70 })
  @AutoMap()
  password: string;
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
