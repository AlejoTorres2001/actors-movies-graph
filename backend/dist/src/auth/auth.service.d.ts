import { JwtService } from '@nestjs/jwt';
import { UsersServiceInterface } from 'src/users/interfaces/users.service.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { Tokens } from './dto/tokens.dto';
import { AuthServiceInterface } from './interfaces/AuthService.interface';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
export declare class AuthService implements AuthServiceInterface {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersServiceInterface, jwtService: JwtService);
    signInLocal(loginDto: LoginDTO): Promise<Tokens>;
    signUpLocal(createUserDto: CreateUserDto): Promise<ReadUserDto>;
    getTokens(userId: string, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private updateRefreshToken;
}
