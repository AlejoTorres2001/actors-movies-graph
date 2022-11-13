import { User } from '../entities/user.entity';

export interface UserAuthServiceInterface {
  getUserByUserName(userName: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(userId: string): Promise<User>;
}
