import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { FilesController } from './upload/upload.controller';
import { loadEntities } from './utils/loadEntities';

const entities = loadEntities('src/**/*.entity{.ts,.js}'); // Dynamically load all entities

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',  // TODO: Set in .env file
      host: 'db', // TODO: Set in .env file
      port: 5432, // TODO: Set in .env file
      username: 'postgres', // TODO: Set in .env file
      password: 'password', // TODO: Set in .env file
      database: 'mydatabase', // TODO: Set in .env file
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController, AuthController, FilesController],
  providers: [AppService, AuthService],
})

export class AppModule { }