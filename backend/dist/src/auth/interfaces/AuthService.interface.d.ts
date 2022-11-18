import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { LoginDTO } from '../dto/login.dto';
import { Tokens } from '../dto/tokens.dto';
export interface AuthServiceInterface {
    signUpLocal(createUserDto: CreateUserDto): Promise<ReadUserDto>;
    signInLocal(loginDto: LoginDTO): Promise<Tokens>;
    refreshTokens(userId: string, refreshToken: string): Promise<Tokens>;
    logout(userId: string): Promise<void>;
}
