import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServiceInterface } from 'src/users/interfaces/users.service.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { Tokens } from './dto/tokens.dto';
import { AuthServiceInterface } from './interfaces/AuthService.interface';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject('UsersServiceInterface')
    private readonly usersService: UsersServiceInterface,
    private readonly jwtService: JwtService,
  ) {}
  async signInLocal(loginDto: LoginDTO): Promise<Tokens> {
    const { email, password } = loginDto;
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new ForbiddenException('Invalid credentials');
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signUpLocal(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email },
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
          secret: process.env.JWT_SECRET,
        },
      ),
      this.jwtService.signAsync(
        { userId, email },
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async logout(userId: string) {
    await this.updateRefreshToken(userId, null);
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.hashRefreshToken)
      throw new ForbiddenException('Invalid credentials');
    const refreshTokenMatch = await user.validateRefreshToken(refreshToken);
    if (!refreshTokenMatch) throw new ForbiddenException('Invalid credentials');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }
  private async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.usersService.getUserById(userId);
    user.hashedRefreshToken = refreshToken;
    await this.usersService.update(user.id, user);
    return;
  }
}
