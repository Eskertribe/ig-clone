import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const { token } = await this.authService.generateJwtToken(user);

    res.cookie('auth-cookie', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.redirect(process.env.CLIENT_HOST);
  }

  @Post('google')
  // @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    const { token } = req.body;

    return await this.authService.verifyGoogleToken(token);
  }
}