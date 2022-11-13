import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiHeaders,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetCurrentUser, Public } from 'src/shared/decorators';
import { RefreshTokenGuard } from 'src/shared/guards';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { AuthService } from './auth.service';
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
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() loginDTO: LoginDTO): Promise<Tokens> {
    try {
      return await this.authService.signInLocal(loginDTO);
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
  async logout(@GetCurrentUser('id') userId: string) {
    try {
      return await this.authService.logout(userId);
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
  ) {
    try {
      return await this.authService.refreshTokens(userId, refreshToken);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
