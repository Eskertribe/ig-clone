import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import typeorm from './config/typeorm.config';
import { FileModule } from './file/file.module';
import { FollowModule } from './follow/follow.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { MessageModule } from './messages/message.module';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { UserModule } from './user/user.module';
import { loadEntities } from './utils/loadEntities';

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
    AuthModule,
    PostModule,
    FileModule,
    UserModule,
    FollowModule,
    HashtagModule,
    MessageModule,
  ],
  controllers: [],
  providers: [PostService],
})
export class AppModule {}
