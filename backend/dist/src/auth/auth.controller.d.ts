import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SignInOutput } from './dto/signInOutput.dto';
import { Tokens } from './dto/tokens.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUpLocal(createUserDto: CreateUserDto): Promise<ReadUserDto>;
    signInLocal(loginDTO: LoginDTO, res: Response): Promise<Omit<SignInOutput, 'refresh_token'>>;
    logout(userId: string, res: Response): Promise<void>;
    refreshTokens(userId: string, refreshToken: string, res: Response): Promise<Partial<Tokens>>;
}
