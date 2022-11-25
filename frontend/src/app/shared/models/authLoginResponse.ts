import { LoggedInUser } from './loggedInUser.model';

export interface AuthLoginResponse extends LoggedInUser {
  access_token: string;
}
