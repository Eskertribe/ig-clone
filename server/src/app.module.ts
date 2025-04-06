import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { loadEntities } from './utils/loadEntities';
import typeorm from './config/typeorm.config';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const entities = loadEntities('src/**/*.entity{.ts,.js}'); // Dynamically load all entities
// TODO: dynamically load all controllers and services

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
    }),
    TypeOrmModule.forFeature(entities),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AuthModule,
    PostModule,
  ],
  controllers: [],
  providers: [PostService],
})
export class AppModule {}
