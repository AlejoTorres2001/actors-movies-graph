import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  InternalServerErrorException,
  Query,
  NotFoundException,
  Put,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReadUserDto } from './dto/read-user.dto';
import { HttpErrorMessage } from 'src/shared/entities/http-error-message.entity';
import { UsersQueryDto } from './dto/users-query.dto';
@ApiTags('users')
@Controller('/api/users')
export class UsersController {
  constructor(
    @Inject('UsersServiceInterface')
    private readonly usersService: UsersServiceInterface,
  ) {}

  @ApiCreatedResponse({ type: ReadUserDto })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException(error);
    }
  }

  @ApiCreatedResponse({ type: [ReadUserDto] })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @Get()
  async findAll(@Query() pagination: UsersQueryDto): Promise<ReadUserDto[]> {
    let foundUsers: ReadUserDto[];
    try {
      foundUsers = await this.usersService.findAll(pagination);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (foundUsers.length === 0) {
      throw new NotFoundException(
        `User with username like  ${pagination.username} not found.`,
      );
    }
    return foundUsers;
  }

  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id of the User',
  })
  async findOne(@Param('id') id: string): Promise<ReadUserDto> {
    let foundUser: ReadUserDto;
    try {
      foundUser = await this.usersService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return foundUser;
  }

  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @ApiCreatedResponse({ type: ReadUserDto })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id of the user',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReadUserDto> {
    let updatedUser: ReadUserDto;
    try {
      updatedUser = await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return updatedUser;
  }
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id of the user',
  })
  @ApiNotFoundResponse({ type: HttpErrorMessage })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    let removedUser: ReadUserDto;
    try {
      removedUser = await this.usersService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!removedUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
  @Post('/many')
  @ApiCreatedResponse({ type: [ReadUserDto] })
  @ApiInternalServerErrorResponse({ type: HttpErrorMessage })
  @ApiBody({ type: [CreateUserDto] })
  async createMany(@Body() users: CreateUserDto[]): Promise<ReadUserDto[]> {
    let createdUsers: ReadUserDto[];
    try {
      createdUsers = await this.usersService.createMany(users);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (createdUsers.length === 0) {
      throw new NotFoundException(`no User data provided`);
    }
    return createdUsers;
  }
}
