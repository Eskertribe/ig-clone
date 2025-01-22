import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { FilesController } from './upload/upload.controller';
import { loadEntities } from './utils/loadEntities';
import typeorm from './config/typeorm.config';

const entities = loadEntities('src/**/*.entity{.ts,.js}'); // Dynamically load all entities
// TODO: dynamically load all controllers and services

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController, AuthController, FilesController],
  providers: [AppService, AuthService],
})
export class AppModule { }