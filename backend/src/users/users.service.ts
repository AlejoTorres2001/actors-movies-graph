import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './interfaces/users.repository.interface';
import { UsersServiceInterface } from './interfaces/users.service.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.classMapper.map(
      await this.usersRepository.save(newUser),
      User,
      ReadUserDto,
    );
  }
  async findAll({
    limit,
    offset,
    username,
  }: UsersQueryDto): Promise<ReadUserDto[]> {
    const foundUser = username
      ? await this.usersRepository.findAll({
          where: { username: Like(`%${username}%`) },
          skip: offset,
          take: limit,
          order: {
            id: 'ASC',
          },
        })
      : await this.usersRepository.findAll({
          skip: offset,
          take: limit,
        });
    return this.classMapper.mapArray(foundUser, User, ReadUserDto);
  }
  async findOne(id: string): Promise<ReadUserDto> {
    const foundUser = await this.usersRepository.findOneById(id);
    return this.classMapper.map(foundUser, User, ReadUserDto);
  }
  async update(
    id: string,
    updateActorDto: UpdateUserDto,
  ): Promise<ReadUserDto> {
    const updatedUser = await this.usersRepository.preload({
      id: id,
      ...updateActorDto,
    });
    if (!updatedUser) {
      return undefined;
    }
    return this.classMapper.map(
      await this.usersRepository.save(updatedUser),
      User,
      ReadUserDto,
    );
  }
  async remove(id: string): Promise<ReadUserDto> {
    const foundUser = await this.usersRepository.findOneById(id);
    if (!foundUser) {
      return undefined;
    }
    return this.classMapper.map(
      await this.usersRepository.remove(foundUser),
      User,
      ReadUserDto,
    );
  }
  async createMany(users: CreateUserDto[]): Promise<ReadUserDto[]> {
    const newUsers = this.usersRepository.createMany(users);
    return this.classMapper.mapArray(
      await this.usersRepository.saveMany(newUsers),
      User,
      ReadUserDto,
    );
  }
  async getUserByUserName(username: string): Promise<User> {
    const foundUser = await this.usersRepository.findByCondition({
      where: { username },
    });
    return foundUser;
  }
  async getUserByEmail(email: string): Promise<User> {
    const foundUser = await this.usersRepository.findByCondition({
      where: { email },
    });
    return foundUser;
  }
  async getUserById(userId: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneById(userId);
    return foundUser;
  }
}
