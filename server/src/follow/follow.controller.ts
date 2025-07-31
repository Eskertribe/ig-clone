import { BadRequestException, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
import { FollowService } from './follow.service';

@Controller('v1/followers')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('/followers/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getFollowers(@Param('userId') userId: UUID, @Req() req) {
    const user = userId || req.user.id;

    if (!user) {
      throw new BadRequestException('User ID is required');
    }

    return this.followService.getFollowers(user);
  }

  @Get('/following/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getFollowing(@Param('userId') userId: UUID, @Req() req) {
    const user = userId || req.user.id;

    if (!user) {
      throw new BadRequestException('User ID is required');
    }

    return this.followService.getFollowing(user);
  }

  @Patch('/follow/:username')
  @UseGuards(AuthGuard('jwt'))
  async followUser(@Param('username') username: string, @Req() req) {
    if (!username) {
      throw new BadRequestException('Username is required');
    }

    if (username === req.user.username) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const userId = req.user.id;

    return this.followService.followUser(userId, username);
  }

  @Patch('/unfollow/:username')
  @UseGuards(AuthGuard('jwt'))
  async unfollowUser(@Param('username') username: string, @Req() req) {
    if (!username) {
      throw new BadRequestException('Username is required');
    }

    if (username === req.user.username) {
      throw new BadRequestException('You cannot unfollow yourself');
    }

    const observer = req.user.id;

    return this.followService.unfollowUser(observer, username);
  }
}
