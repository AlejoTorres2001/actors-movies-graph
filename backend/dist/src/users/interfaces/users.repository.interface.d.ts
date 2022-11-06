import { BaseInterfaceRepository } from 'src/shared/repositories/base/base.interface.repository';
import { User } from '../entities/user.entity';
export interface UserRepositoryInterface extends BaseInterfaceRepository<User> {
}
