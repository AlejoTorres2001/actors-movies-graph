import { AutoMap } from '@automapper/classes';
import * as argon from 'argon2';
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
  @Column({ type: 'varchar', length: 255 })
  @AutoMap()
  password: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await argon.hash(this.password);
  }
  @Column({ nullable: true })
  @Exclude()
  @AutoMap()
  public hashedRefreshToken?: string;
  @BeforeUpdate()
  async hashRefreshToken() {
    if (this.hashedRefreshToken) {
      this.hashedRefreshToken = await argon.hash(this.hashedRefreshToken);
    }
  }
  async validatePassword(password: string): Promise<boolean> {
    return await argon.verify(this.password, password);
  }
  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    return await argon.verify(this.hashedRefreshToken, refreshToken);
  }
}
