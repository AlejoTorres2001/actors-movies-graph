import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
@Controller('api/auth/login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    let valid = false;
    try {
      const { email, password } = loginDTO;
      valid = await this.authService.validateUser(email, password);
      if (!valid) throw new UnauthorizedException('Invalid Credentials');
      return await this.authService.generateAccessToken(email);
    } catch (e: any) {
      throw e;
    }
  }
}
