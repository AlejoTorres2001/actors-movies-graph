import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Tokens } from './dto/tokens.dto';
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
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
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() loginDTO: LoginDTO): Promise<Tokens> {
    try {
      return await this.authService.signInLocal(loginDTO);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const user = req.user;
    try {
      return await this.authService.logout(user['userId']);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: Request) {
    try {
      const user = req.user;
      return await this.authService.refreshTokens(
        user['id'],
        user['refreshToken'],
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
