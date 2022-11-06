import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import { ReadUserDto } from './dto/read-user.dto';
import { UsersQueryDto } from './dto/users-query.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersServiceInterface);
    create(createUserDto: CreateUserDto): Promise<ReadUserDto>;
    findAll(pagination: UsersQueryDto): Promise<ReadUserDto[]>;
    findOne(id: string): Promise<ReadUserDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ReadUserDto>;
    remove(id: string): Promise<void>;
    createMany(users: CreateUserDto[]): Promise<ReadUserDto[]>;
}
