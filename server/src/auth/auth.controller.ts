import { Controller, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('google')
  async googleAuth(@Req() req) {
    const { token } = req.body;

    return await this.authService.verifyGoogleToken(token);
  }
}