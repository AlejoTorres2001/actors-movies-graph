import { AutoMap } from '@automapper/classes';
import * as bcrypt from 'bcrypt';
import { IsAlphanumeric, IsEmail, MinLength } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
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
  @IsAlphanumeric()
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
  @Column({ nullable: true })
  @Exclude()
  @AutoMap()
  public hashedRefreshToken?: string;
  @BeforeInsert()
  @BeforeUpdate()
  async hashRefreshToken() {
    if (this.hashedRefreshToken) {
      const salt = await bcrypt.genSalt(10);
      this.hashedRefreshToken = await bcrypt.hash(
        this.hashedRefreshToken,
        salt,
      );
    }
  }
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    return await bcrypt.compare(refreshToken, this.hashedRefreshToken);
  }
}
