import { Controller, Get, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @Get('google/callback')
  // @UseGuards(AuthGuard('jwt'))
  // async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
  //   console.log("GOOGLE/CALLBACK");
  //   const user = req.user;
  //   const { token } = await this.authService.generateJwtToken(user);

  //   res.cookie('auth-cookie', token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //   });
  //   res.redirect(process.env.CLIENT_HOST);
  // }

  @Post('google')
  async googleAuth(@Req() req) {
    const { token } = req.body;

    return await this.authService.verifyGoogleToken(token);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signup(createUserDto);
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