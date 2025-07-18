import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { UserFollower } from './entity/userfollower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFollower])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
