import { BadRequestException, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
import { UserService } from './user.service';
import { UserProfileDataDto } from './dto/user.dto';

@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/:username')
  @UseGuards(AuthGuard('jwt'))
  // @Returns(UserProfileDataDto)
  async getProfile(@Param('username') username: string, @Req() req) {
    if (!username) {
      throw new BadRequestException('Username is required');
    }

    const observerId = req.user.id;

    const user = await this.userService.getUserProfileDataByUsername(username, observerId);
    return { user };
  }

  @Get('/find/:query')
  @UseGuards(AuthGuard('jwt'))
  async findUserByQuery(@Param('query') query: string, @Req() req) {
    if (!query) {
      throw new BadRequestException('Query is required');
    }

    const observerUsername = req.user.username;
    const queryResult = await this.userService.findUserByQuery(query, observerUsername);

    return queryResult;
  }
}
