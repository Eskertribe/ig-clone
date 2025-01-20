import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './user/entity/user.entity';
import { FilesController } from './upload/files.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',  // TODO: Set in .env file
      host: 'db', // TODO: Set in .env file
      port: 5432, // TODO: Set in .env file
      username: 'postgres', // TODO: Set in .env file
      password: 'password', // TODO: Set in .env file
      database: 'mydatabase', // TODO: Set in .env file
      entities: [User],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, AuthController, FilesController],
  providers: [AppService, AuthService],
})
export class AppModule { }