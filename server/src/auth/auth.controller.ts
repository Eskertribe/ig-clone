import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleAuth(@Req() req) {
    const { token } = req.body;

    return await this.authService.verifyGoogleToken(token);
  }

  @Post('signUp')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    const { token } = await this.authService.generateJwtToken(user);

    return { user, token };
  }

  @Post('login')
  async login(@Body() loginUserDto: CreateUserDto) {
    const user = await this.authService.login(loginUserDto);
    const { token } = await this.authService.generateJwtToken(user);

    return { user, token };
  }
}
