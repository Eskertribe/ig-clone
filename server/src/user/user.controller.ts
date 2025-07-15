import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
import { UserService } from './user.service';
import { UserProfileDataDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/:userId')
  @UseGuards(AuthGuard('jwt'))
  // @Returns(UserProfileDataDto)
  async getFile(@Param('userId') userId: UUID) {
    const user = await this.userService.getUserProfileDataById(userId);
    return { user };
  }
}
