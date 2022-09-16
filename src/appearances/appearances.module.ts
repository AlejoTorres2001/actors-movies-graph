import { Module } from '@nestjs/common';
import { AppearancesService } from './appearances.service';
import { AppearancesController } from './appearances.controller';
import { Appearance } from './entities/appearance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Appearance])],
  controllers: [AppearancesController],
  providers: [AppearancesService],
})
export class AppearancesModule {}
