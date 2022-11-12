import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from '../dto/login.dto';
import { Tokens } from '../dto/tokens.dto';

export interface IAuthService {
  signUpLocal(createUserDto: CreateUserDto): Promise<Tokens>;
  signInLocal(loginDto: LoginDTO): Promise<Tokens>;
  refreshTokens(userId: string, refreshToken: string): Promise<Tokens>;
  logout(userId: string): Promise<void>;
}
