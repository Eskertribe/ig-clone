import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollower } from '../follow/entity/userfollower.entity';
import { Hashtag } from '../hashtag/entity/hashtag.entity';
import { Like } from '../like/entity/like.entity';
import { Comment } from '../comment/entity/comment.entity';
import { User } from '../user/entity/user.entity';
import { Post } from './entity/post.entity';
import { PostToHashtag } from './entity/postToHashtag.entity';
import { UserSeenPost } from './entity/userSeenPost.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([
      User,
      Post,
      Comment,
      Like,
      Hashtag,
      PostToHashtag,
      UserFollower,
      UserSeenPost,
    ]),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
