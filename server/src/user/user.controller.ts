import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
import { ApiResponse } from '../middleware/ApiResponse';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/:userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse('user')
  async getFile(@Param('userId') userId: UUID) {
    return this.userService.getUserProfileDataById(userId);
  }
}
