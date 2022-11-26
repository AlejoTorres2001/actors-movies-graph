import { JwtService } from '@nestjs/jwt';
import { UsersServiceInterface } from 'src/users/interfaces/users.service.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthServiceInterface } from './interfaces/AuthService.interface';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { Mapper } from '@automapper/core';
import { SignInOutput } from './dto/signInOutput.dto';
export declare class AuthService implements AuthServiceInterface {
    private readonly usersService;
    private readonly jwtService;
    private readonly classMapper;
    constructor(usersService: UsersServiceInterface, jwtService: JwtService, classMapper: Mapper);
    signInLocal(loginDto: LoginDTO): Promise<SignInOutput>;
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
