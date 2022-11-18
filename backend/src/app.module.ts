import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import { AppearancesModule } from './appearances/appearances.module';
import { GraphsModule } from './graphs/graphs.module';
import { ApiLog } from './shared/entities/api-log.entity';
import { LoggingInterceptor } from './shared/interceptors/logger.interceptor';
import { ApiTimeOutInterceptor } from './shared/interceptors/api-timeout.interceptor';
import { Exception } from './shared/entities/exception.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exceptions/exceptions-filter';
import { dataSourceOptions } from 'db/data-source';
import configuration from '../config/configuration';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './shared/guards';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/front'),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({ useFactory: () => dataSourceOptions }),
    ActorsModule,
    AppearancesModule,
    //GraphsModule,
    TypeOrmModule.forFeature([ApiLog]),
    TypeOrmModule.forFeature([Exception]),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
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
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
