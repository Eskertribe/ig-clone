import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
import { UserService } from './user.service';
import { UserProfileDataDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/:username')
  @UseGuards(AuthGuard('jwt'))
  // @Returns(UserProfileDataDto)
  async getFile(@Param('username') username: string) {
    const user = await this.userService.getUserProfileDataByUsername(username);
    return { user };
  }

  @Get('/find/:query')
  @UseGuards(AuthGuard('jwt'))
  async findUserByQuery(@Param('query') query: string) {
    const queryResult = await this.userService.findUserByQuery(query);

    return queryResult;
  }
}
