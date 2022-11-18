import { Mapper } from '@automapper/core';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';
import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './interfaces/users.repository.interface';
import { UsersServiceInterface } from './interfaces/users.service.interface';
export declare class UsersService implements UsersServiceInterface {
    private readonly usersRepository;
    private readonly classMapper;
    constructor(usersRepository: UserRepositoryInterface, classMapper: Mapper);
    create(createUserDto: CreateUserDto): Promise<ReadUserDto>;
    findAll({ limit, offset, username, }: UsersQueryDto): Promise<ReadUserDto[]>;
    findOne(id: string): Promise<ReadUserDto>;
    update(id: string, updateActorDto: UpdateUserDto): Promise<ReadUserDto>;
    remove(id: string): Promise<ReadUserDto>;
    createMany(users: CreateUserDto[]): Promise<ReadUserDto[]>;
    getUserByUserName(username: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(userId: string): Promise<User>;
}
