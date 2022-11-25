import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiHeaders,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { GetCurrentUser, Public } from 'src/shared/decorators';
import { RefreshTokenGuard } from 'src/shared/guards';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.dto';
import { LoginDTO } from './dto/login.dto';
import { Tokens } from './dto/tokens.dto';
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReadUserDto> {
    try {
      return await this.authService.signUpLocal(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException(error);
    }
  }
  @Public()
  @Post('local/signin')
  @ApiOkResponse({
    description: 'Returns the access token',
    type: AccessToken,
  })
  @HttpCode(HttpStatus.OK)
  async signInLocal(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessToken> {
    try {
      const tokens: Tokens = await this.authService.signInLocal(loginDTO);
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true, //!disable if testing on postman
        domain:
          process.env.NODE_ENV === 'production'
            ? process.env.PROD_DOMAIN
            : process.env.DEV_DOMAIN,
        maxAge: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
      });
      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw error;
    }
  }
  @Post('logout')
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer access_token',
    },
  ])
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    try {
      await this.authService.logout(userId);
      res.clearCookie('refresh_token', { httpOnly: true });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOkResponse({ type: Tokens })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer refresh_token',
    },
  ])
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('id') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Partial<Tokens>> {
    try {
      const tokens: Tokens = await this.authService.refreshTokens(
        userId,
        refreshToken,
      );
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true, //!disable if testing on postman
        domain:
          process.env.NODE_ENV === 'production'
            ? process.env.PROD_DOMAIN
            : process.env.DEV_DOMAIN,
        maxAge: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
      });
      return { access_token: tokens.access_token };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
