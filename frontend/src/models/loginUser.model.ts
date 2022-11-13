import { RegisterUser } from './registerUser.model';

export interface LoginUser extends Partial<RegisterUser> {
  email: string;
  password: string;
}
