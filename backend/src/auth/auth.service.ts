import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { UsersServiceInterface } from 'src/users/interfaces/users.service.interface';
@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersServiceInterface')
    private readonly usersService: UsersServiceInterface,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(email);
    return await user.validatePassword(password);
  }
  async generateAccessToken(email: string) {
    const user = await this.usersService.getUserByEmail(email);
    const payload: JWTPayload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
