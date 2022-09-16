import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import { AppearancesModule } from './appearances/appearances.module';
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
      }),
    }),
    ActorsModule,
    AppearancesModule,
  ],
})
export class AppModule {}
