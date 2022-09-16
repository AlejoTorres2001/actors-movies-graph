import { Module } from '@nestjs/common';
import { AppearancesService } from './appearances.service';
import { AppearancesController } from './appearances.controller';

@Module({
  controllers: [AppearancesController],
  providers: [AppearancesService]
})
export class AppearancesModule {}
