import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import { AppearancesModule } from './appearances/appearances.module';
import { AppController } from './app.controller';
import { GraphsModule } from './graphs/graphs.module';
import { ApiLog } from './shared/entities/api-log.entity';
import { LoggingInterceptor } from './shared/interceptors/logger.interceptor';
import { ApiTimeOutInterceptor } from './shared/interceptors/api-timeout.interceptor';
import { Exception } from './shared/entities/exception.entity';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exceptions/exceptions-filter';
import { dataSourceOptions } from 'db/data-source';
import configuration from '../config/configuration';
@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({ useFactory: () => dataSourceOptions }),
    ActorsModule,
    AppearancesModule,
    GraphsModule,
    TypeOrmModule.forFeature([ApiLog]),
    TypeOrmModule.forFeature([Exception]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ApiTimeOutInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
