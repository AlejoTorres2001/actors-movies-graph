import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Tokens } from './dto/tokens.dto';
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/local/signup')
  async signUpLocal(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    try {
      return await this.authService.signUpLocal(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException(error);
    }
  }
  @Post('/local/signin')
  async signInLocal(@Body() loginDTO: LoginDTO): Promise<Tokens> {
    try {
      return await this.authService.signInLocal(loginDTO);
    } catch (error) {
      throw error;
    }
  }
  @Post('/logout/:userId')
  async logout(@Param('userId') userId: string) {
    try {
      return await this.authService.logout(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Post('/refresh')
  async refreshTokens() {
    try {
      return await this.authService.refreshTokens();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
