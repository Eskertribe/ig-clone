import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';

@Controller('followers')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('/followers/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getFollowers(@Param('userId') userId: UUID, @Req() req) {
    const user = userId || req.user.id;

    return this.followService.getFollowers(user);
  }

  @Get('/following/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getFollowing(@Param('userId') userId: UUID, @Req() req) {
    const user = userId || req.user.id;

    return this.followService.getFollowing(user);
  }
}
