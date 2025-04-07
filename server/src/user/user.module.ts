import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Post } from '../post/entity/post.entity';
import { File } from '../file/entity/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, File])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
