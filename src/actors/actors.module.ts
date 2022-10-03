import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { Actor } from './entities/actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsRepository } from 'src/shared/repositories/actors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [
    {
      provide: 'ActorRepositoryInterface',
      useClass: ActorsRepository,
    },
    {
      provide: 'ActorsServiceInterface',
      useClass: ActorsService,
    },
  ],
})
export class ActorsModule {}
