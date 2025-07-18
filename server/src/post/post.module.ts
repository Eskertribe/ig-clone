import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from 'src/hashtag/entity/hashtag.entity';
import { Like } from 'src/like/entity/like.entity';
import { Comment } from '../comment/entity/comment.entity';
import { User } from '../user/entity/user.entity';
import { Post } from './entity/post.entity';
import { PostToHashtag } from './entity/postToHashtag.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Post, Comment, Like, Hashtag, PostToHashtag]),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
