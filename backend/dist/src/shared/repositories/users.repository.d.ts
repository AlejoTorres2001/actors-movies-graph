import { User } from 'src/users/entities/user.entity';
import { UserRepositoryInterface } from 'src/users/interfaces/users.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
export declare class UsersRepository extends BaseAbstractRepository<User> implements UserRepositoryInterface {
    private readonly UserRepository;
    constructor(UserRepository: Repository<User>);
}
