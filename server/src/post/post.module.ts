import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule { }