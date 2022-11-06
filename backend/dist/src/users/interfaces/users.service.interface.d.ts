import { CreateUserDto } from '../dto/create-user.dto';
import { ReadUserDto } from '../dto/read-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersQueryDto } from '../dto/users-query.dto';
export interface UsersServiceInterface {
    create(creteUserDto: CreateUserDto): Promise<ReadUserDto>;
    findAll(actorsQueryDto: UsersQueryDto): Promise<ReadUserDto[]>;
    findOne(id: string): Promise<ReadUserDto>;
    update(id: string, updateActorDto: UpdateUserDto): Promise<ReadUserDto>;
    remove(id: string): Promise<ReadUserDto>;
    createMany(createActorDto: CreateUserDto[]): Promise<ReadUserDto[]>;
}
