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
@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
        ssl: true,
        autoLoadEntities: true,
        synchronize: true, //!only for dev
        extra: {
          max: 3,
        },
      }),
    }),
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
