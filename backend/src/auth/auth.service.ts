import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServiceInterface } from 'src/users/interfaces/users.service.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { Tokens } from './dto/tokens.dto';
import { IAuthService } from './interfaces/AuthService.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService implements IAuthService {
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

  async signUpLocal(createUserDto: CreateUserDto): Promise<Tokens> {
    const newUser = await this.usersService.create(createUserDto);
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email },
        {
          expiresIn: '30s',
          secret: process.env.JWT_SECRET,
        },
      ),
      this.jwtService.signAsync(
        { userId, email },
        {
          expiresIn: '1h',
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
    if (!user) throw new ForbiddenException('Invalid credentials');
    const refreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
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
