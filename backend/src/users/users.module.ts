import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from 'src/shared/repositories/users.repository';
import { UserProfile } from 'src/shared/profiles/user-profile';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
    {
      provide: 'UsersServiceInterface',
      useClass: UsersService,
    },
    UserProfile,
  ],
  exports: ['UsersServiceInterface'],
})
export class UsersModule {}
